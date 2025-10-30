import { Body, Controller, Get, Param, Post, UseGuards, Patch, BadRequestException, Query } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { JwtGuard } from "../../common/guards/jwt.guard";
import { RoleGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Role, AssignmentStatus } from "@prisma/client";

@Controller("assignments")
@UseGuards(JwtGuard, RoleGuard)
export class AssignmentsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() body: { requestId: string; agentId: string }) {
    if (!body.requestId || !body.agentId) {
      throw new BadRequestException("Missing required fields");
    }

    // Check if request exists
    const request = await this.prisma.verificationRequest.findUnique({ where: { id: body.requestId } });
    if (!request) throw new BadRequestException("Request not found");

    // Check if agent exists
    const agent = await this.prisma.user.findUnique({ where: { id: body.agentId } });
    if (!agent || agent.role !== Role.FIELD) throw new BadRequestException("Invalid agent");

    // Check if already assigned
    const existing = await this.prisma.assignment.findFirst({
      where: { requestId: body.requestId, agentId: body.agentId }
    });
    if (existing) throw new BadRequestException("Agent already assigned to this request");

    const assignment = await this.prisma.assignment.create({
      data: {
        requestId: body.requestId,
        agentId: body.agentId
      },
      include: { agent: true, request: true }
    });

    return assignment;
  }

  @Get("my-assignments")
  @Roles(Role.FIELD)
  async myAssignments(
    @Query("status") status?: string,
    @Query("skip") skip?: string,
    @Query("take") take?: string,
    @CurrentUser() user?: any
  ) {
    const pageSize = Math.min(Number(take) || 20, 100);
    const pageSkip = Number(skip) || 0;
    const where: any = { agentId: user.sub };

    if (status) {
      where.status = status;
    }

    const [assignments, total] = await Promise.all([
      this.prisma.assignment.findMany({
        where,
        include: {
          request: { include: { requester: true, clientOrg: true } },
          agent: true
        },
        orderBy: { assignedAt: "desc" },
        skip: pageSkip,
        take: pageSize
      }),
      this.prisma.assignment.count({ where })
    ]);

    return {
      data: assignments,
      pagination: { total, skip: pageSkip, take: pageSize, pages: Math.ceil(total / pageSize) }
    };
  }

  @Get(":id")
  async get(@Param("id") id: string, @CurrentUser() user: any) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
      include: {
        request: { include: { requester: true, clientOrg: true, evidences: true } },
        agent: true
      }
    });

    if (!assignment) throw new BadRequestException("Assignment not found");

    // Verify access
    if (user.role === Role.FIELD && assignment.agentId !== user.sub) {
      throw new BadRequestException("Access denied");
    }

    return assignment;
  }

  @Patch(":id/status")
  @Roles(Role.FIELD, Role.ADMIN)
  async updateStatus(@Param("id") id: string, @Body() body: { status: AssignmentStatus }, @CurrentUser() user: any) {
    const assignment = await this.prisma.assignment.findUnique({ where: { id } });
    if (!assignment) throw new BadRequestException("Assignment not found");

    // Agents can only update their own assignments
    if (user.role === Role.FIELD && assignment.agentId !== user.sub) {
      throw new BadRequestException("Access denied");
    }

    const updateData: any = { status: body.status };

    if (body.status === "IN_PROGRESS" && !assignment.startedAt) {
      updateData.startedAt = new Date();
    }

    if (body.status === "COMPLETED") {
      updateData.completedAt = new Date();
    }

    const updated = await this.prisma.assignment.update({
      where: { id },
      data: updateData,
      include: { agent: true, request: true }
    });

    return updated;
  }

  @Get("request/:requestId")
  @Roles(Role.ADMIN)
  async getByRequest(@Param("requestId") requestId: string) {
    const assignments = await this.prisma.assignment.findMany({
      where: { requestId },
      include: { agent: true }
    });

    return assignments;
  }
}
