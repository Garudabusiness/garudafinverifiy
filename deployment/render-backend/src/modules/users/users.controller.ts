import { Controller, Get, UseGuards, Param, Query } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { JwtGuard } from "../../common/guards/jwt.guard";
import { RoleGuard } from "../../common/guards/role.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Role } from "@prisma/client";

@Controller("users")
@UseGuards(JwtGuard, RoleGuard)
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get("me")
  async me(@CurrentUser() user: any) {
    const userRecord = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        orgId: true,
        org: { select: { id: true, name: true, type: true } },
        isActive: true,
        createdAt: true
      }
    });

    return userRecord;
  }

  @Get("agents")
  @Roles(Role.ADMIN)
  async getAgents(@Query("orgId") orgId?: string) {
    const agents = await this.prisma.user.findMany({
      where: {
        role: Role.FIELD,
        ...(orgId && { orgId })
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        orgId: true,
        isActive: true,
        assignments: { select: { id: true, status: true } }
      }
    });

    return agents;
  }

  @Get("clients")
  @Roles(Role.ADMIN)
  async getClients() {
    const clients = await this.prisma.user.findMany({
      where: { role: Role.CLIENT },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        org: { select: { id: true, name: true } },
        isActive: true
      }
    });

    return clients;
  }

  @Get(":id")
  @Roles(Role.ADMIN)
  async getUser(@Param("id") id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        orgId: true,
        org: { select: { id: true, name: true, type: true } },
        isActive: true,
        createdAt: true
      }
    });

    return user;
  }
}
