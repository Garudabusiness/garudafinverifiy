import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader) {
      throw new UnauthorizedException("Missing authorization header");
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
