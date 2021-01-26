import { Controller, Get, Post, Param, Body, Put, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login-google")
  async loginGoogle() {
    return this.authService.buildLink();
  }

  @Get("/auth")
  async auth(@Query("code") code: string) {
    return this.authService.auth(code);
  }
}
