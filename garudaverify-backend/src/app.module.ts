import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { RequestsModule } from "./modules/requests/requests.module";
import { AssignmentsModule } from "./modules/assignments/assignments.module";
import { EvidenceModule } from "./modules/evidence/evidence.module";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [AuthModule, UsersModule, RequestsModule, AssignmentsModule, EvidenceModule],
  providers: [PrismaService]
})
export class AppModule {}
