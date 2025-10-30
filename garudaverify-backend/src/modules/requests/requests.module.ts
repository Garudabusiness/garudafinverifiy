import { Module } from "@nestjs/common";
import { RequestsController } from "./requests.controller";
import { PrismaService } from "../../prisma.service";
@Module({ controllers: [RequestsController], providers: [PrismaService] })
export class RequestsModule {}
