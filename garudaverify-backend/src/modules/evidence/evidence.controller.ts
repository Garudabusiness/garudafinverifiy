import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  BadRequestException,
  Query,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PrismaService } from "../../prisma.service";
import { JwtGuard } from "../../common/guards/jwt.guard";
import { RoleGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Role, EvidenceKind } from "@prisma/client";
import { Express } from "express";
import * as path from "path";
import * as fs from "fs";

@Controller("evidence")
@UseGuards(JwtGuard, RoleGuard)
export class EvidenceController {
  constructor(private prisma: PrismaService) {}

  @Post("upload")
  @Roles(Role.FIELD, Role.ADMIN)
  @UseInterceptors(FileInterceptor("file"))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { requestId: string; kind: EvidenceKind; gpsLat?: string; gpsLng?: string },
    @CurrentUser() user: any
  ) {
    if (!file) throw new BadRequestException("No file uploaded");
    if (!body.requestId || !body.kind) throw new BadRequestException("Missing required fields");

    // Verify request exists
    const request = await this.prisma.verificationRequest.findUnique({ where: { id: body.requestId } });
    if (!request) throw new BadRequestException("Request not found");

    // Verify agent is assigned to this request (if field agent)
    if (user.role === Role.FIELD) {
      const assignment = await this.prisma.assignment.findFirst({
        where: { requestId: body.requestId, agentId: user.sub }
      });
      if (!assignment) throw new BadRequestException("Not assigned to this request");
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save file with unique name
    const timestamp = Date.now();
    const uniqueName = `${timestamp}-${user.sub}-${file.originalname}`;
    const filepath = path.join(uploadsDir, uniqueName);
    fs.writeFileSync(filepath, file.buffer);

    // Create evidence record
    const evidence = await this.prisma.evidence.create({
      data: {
        requestId: body.requestId,
        uploaderId: user.sub,
        kind: body.kind as EvidenceKind,
        filename: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        storageKey: uniqueName,
        gpsLat: body.gpsLat ? parseFloat(body.gpsLat) : undefined,
        gpsLng: body.gpsLng ? parseFloat(body.gpsLng) : undefined,
        shotAt: new Date()
      },
      include: { uploader: { select: { id: true, name: true } } }
    });

    return evidence;
  }

  @Get("request/:requestId")
  async getByRequest(
    @Param("requestId") requestId: string,
    @Query("kind") kind?: string,
    @CurrentUser() user?: any
  ) {
    // Verify request exists and access
    const request = await this.prisma.verificationRequest.findUnique({ where: { id: requestId } });
    if (!request) throw new BadRequestException("Request not found");

    if (user.role === Role.CLIENT && request.clientOrgId !== user.orgId) {
      throw new BadRequestException("Access denied");
    }

    if (user.role === Role.FIELD) {
      const assignment = await this.prisma.assignment.findFirst({
        where: { requestId, agentId: user.sub }
      });
      if (!assignment) throw new BadRequestException("Access denied");
    }

    const where: any = { requestId };
    if (kind) where.kind = kind;

    const evidences = await this.prisma.evidence.findMany({
      where,
      include: { uploader: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" }
    });

    return evidences;
  }

  @Get(":id")
  async get(@Param("id") id: string, @CurrentUser() user: any) {
    const evidence = await this.prisma.evidence.findUnique({
      where: { id },
      include: { uploader: { select: { id: true, name: true } } }
    });

    if (!evidence) throw new BadRequestException("Evidence not found");

    const request = await this.prisma.verificationRequest.findUnique({ where: { id: evidence.requestId } });

    if (user.role === Role.CLIENT && request?.clientOrgId !== user.orgId) {
      throw new BadRequestException("Access denied");
    }

    if (user.role === Role.FIELD) {
      const assignment = await this.prisma.assignment.findFirst({
        where: { requestId: evidence.requestId, agentId: user.sub }
      });
      if (!assignment) throw new BadRequestException("Access denied");
    }

    return evidence;
  }

  @Post(":id/delete")
  @Roles(Role.FIELD, Role.ADMIN)
  async delete(@Param("id") id: string, @CurrentUser() user: any) {
    const evidence = await this.prisma.evidence.findUnique({ where: { id } });
    if (!evidence) throw new BadRequestException("Evidence not found");

    // Only uploader or admin can delete
    if (user.role === Role.FIELD && evidence.uploaderId !== user.sub) {
      throw new BadRequestException("Access denied");
    }

    // Delete file from storage
    const filepath = path.join(process.cwd(), "uploads", evidence.storageKey);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await this.prisma.evidence.delete({ where: { id } });

    return { success: true };
  }
}
