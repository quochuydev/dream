import { Controller, Get, Post, Body, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUser } from "../../decorators";
import { JwtGuard } from "../auth/jwt.guard";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login-google")
  async loginGoogle() {
    return this.authService.buildLink();
  }

  @Post("/auth")
  async auth(@Body("code") code: string, @Res() res) {
    const token = await this.authService.auth(code);
    res.cookie("accessToken", token);
    return res.send(token);
  }

  @Get("/auth/me")
  @UseGuards(JwtGuard)
  async me(@AuthUser("id") userId: string) {
    return this.authService.me(userId);
  }

  @Post("/auth/logout")
  async logout(@Res() res) {
    res.cookie("accessToken", null);
    return res.sendStatus(200);
  }
}
