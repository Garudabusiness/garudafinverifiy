import { Body, Controller, Post } from "@nestjs/common";
import { IsString, IsNotEmpty } from "class-validator";
import { AuthService } from "./auth.service";
class LoginDto {
  @IsString()
  @IsNotEmpty()
  identifier!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post("login")
  async login(@Body() body: LoginDto) {
    const user = await this.auth.validate(body.identifier, body.password);
    const tokens = this.auth.signTokens(user);
    return { ...tokens, user: { id: user.id, role: user.role, name: user.name, orgId: user.orgId } };
  }
}
