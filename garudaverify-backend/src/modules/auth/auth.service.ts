import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
const ACCESS_TTL = Number(process.env.JWT_ACCESS_EXPIRES||900);
const REFRESH_TTL = Number(process.env.JWT_REFRESH_EXPIRES||1209600);
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async validate(identifier: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { OR: [{ email: identifier }, { phone: identifier }] } });
    if (!user) throw new UnauthorizedException("Invalid credentials");
    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) throw new UnauthorizedException("Invalid credentials");
    return user;
  }
  signTokens(user: any) {
    const accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET!, { expiresIn: ACCESS_TTL });
    const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: REFRESH_TTL });
    return { accessToken, refreshToken };
  }
}
