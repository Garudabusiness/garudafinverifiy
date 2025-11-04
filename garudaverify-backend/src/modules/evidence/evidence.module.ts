import { Module } from "@nestjs/common";
import { EvidenceController } from "./evidence.controller";
import { PrismaService } from "../../prisma.service";

@Module({
  controllers: [EvidenceController],
  providers: [PrismaService]
})
export class EvidenceModule {}
