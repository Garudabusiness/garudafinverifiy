import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { PrismaService } from "../../prisma.service";

@Module({
  controllers: [UsersController],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class UsersModule {}
