import { Controller, Get, Post, Body, Headers, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login-google")
  async loginGoogle() {
    return this.authService.buildLink();
  }

  @Post("/auth")
  async auth(@Body("code") code: string) {
    return this.authService.auth(code);
  }

  @Get("/auth/me")
  async me(@Headers("accessToken") accessToken: string) {
    return this.authService.me(accessToken);
  }
}
