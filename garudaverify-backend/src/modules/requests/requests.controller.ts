import { Body, Controller, Get, Param, Post, Query, UseGuards, Patch, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { JwtGuard } from "../../common/guards/jwt.guard";
import { RoleGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { CreateRequestDto, UpdateRequestDto } from "./dtos";
import { Role } from "@prisma/client";

@Controller("requests")
@UseGuards(JwtGuard, RoleGuard)
export class RequestsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(
    @Query("skip") skip?: string,
    @Query("take") take?: string,
    @Query("status") status?: string,
    @Query("search") search?: string,
    @CurrentUser() user?: any
  ) {
    const pageSize = Math.min(Number(take) || 20, 100);
    const pageSkip = Number(skip) || 0;
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { subjectName: { contains: search, mode: "insensitive" } },
        { id: { contains: search, mode: "insensitive" } },
        { loanRefNo: { contains: search, mode: "insensitive" } }
      ];
    }

    // Clients can only see their own requests
    if (user?.role === Role.CLIENT) {
      where.clientOrgId = user.orgId;
    }

    // Field agents can only see assigned requests
    if (user?.role === Role.FIELD) {
      where.assignments = {
        some: { agentId: user.sub }
      };
    }

    const [requests, total] = await Promise.all([
      this.prisma.verificationRequest.findMany({
        where,
        include: { requester: true, clientOrg: true, assignments: true, evidences: true },
        orderBy: { createdAt: "desc" },
        skip: pageSkip,
        take: pageSize
      }),
      this.prisma.verificationRequest.count({ where })
    ]);

    return {
      data: requests,
      pagination: { total, skip: pageSkip, take: pageSize, pages: Math.ceil(total / pageSize) }
    };
  }

  @Post()
  @Roles(Role.CLIENT, Role.ADMIN)
  async create(@Body() body: CreateRequestDto, @CurrentUser() user: any) {
    if (!body.requesterId || !body.type || !body.subjectName) {
      throw new BadRequestException("Missing required fields");
    }

    const request = await this.prisma.verificationRequest.create({
      data: {
        type: body.type,
        requesterId: body.requesterId,
        clientOrgId: body.clientOrgId || user.orgId,
        subjectName: body.subjectName,
        subjectPhone: body.subjectPhone,
        subjectAddress: body.subjectAddress,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        loanRefNo: body.loanRefNo,
        priority: body.priority || "NORMAL"
      },
      include: { requester: true, clientOrg: true }
    });

    return request;
  }

  @Get(":id")
  async get(@Param("id") id: string, @CurrentUser() user: any) {
    const request = await this.prisma.verificationRequest.findUnique({
      where: { id },
      include: {
        requester: true,
        clientOrg: true,
        assignments: { include: { agent: true } },
        evidences: true,
        reports: true
      }
    });

    if (!request) {
      throw new BadRequestException("Request not found");
    }

    // Verify access
    if (user.role === Role.CLIENT && request.clientOrgId !== user.orgId) {
      throw new BadRequestException("Access denied");
    }

    if (user.role === Role.FIELD) {
      const hasAccess = request.assignments.some(a => a.agentId === user.sub);
      if (!hasAccess) throw new BadRequestException("Access denied");
    }

    return request;
  }

  @Patch(":id")
  @Roles(Role.ADMIN)
  async update(@Param("id") id: string, @Body() body: UpdateRequestDto) {
    const request = await this.prisma.verificationRequest.update({
      where: { id },
      data: body,
      include: { requester: true, clientOrg: true, assignments: true }
    });

    return request;
  }
}
