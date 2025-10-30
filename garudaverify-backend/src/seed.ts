import { PrismaClient, Role, OrgType, RequestType } from "@prisma/client";
import * as argon2 from "argon2";
const prisma = new PrismaClient();
async function main() {
  const hq = await prisma.organization.create({ data: { name: "GarudaVerify HQ", type: OrgType.INTERNAL } });
  const adminPass = await argon2.hash("Admin@123");
  const clientPass = await argon2.hash("Client@123");
  const fieldPass = await argon2.hash("Field@123");
  const admin = await prisma.user.create({ data: { name: "Admin", email: "admin@garudaverify.in", role: Role.ADMIN, passwordHash: adminPass, orgId: hq.id } });
  const clientOrg = await prisma.organization.create({ data: { name: "Sample Client Org", type: OrgType.CLIENT } });
  const client = await prisma.user.create({ data: { name: "Client User", email: "client@acme.com", role: Role.CLIENT, passwordHash: clientPass, orgId: clientOrg.id } });
  const field  = await prisma.user.create({ data: { name: "Field Agent", email: "field@garudaverify.in", role: Role.FIELD,  passwordHash: fieldPass, orgId: hq.id } });
  await prisma.verificationRequest.create({ data: { type: RequestType.loan, requesterId: client.id, clientOrgId: clientOrg.id, subjectName: "John Doe" } });
  console.log("Seed complete:", { admin: admin.email, client: client.email, field: field.email });
}
main().finally(()=>prisma.$disconnect());
