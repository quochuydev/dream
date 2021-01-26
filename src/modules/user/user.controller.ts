import { UserService } from "./user.service";
import {
  BadRequestException,
  Body,
  Param,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
  Res,
} from "@nestjs/common";

@Controller("/api/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async list(@Query() query) {
    return { users: this.userService.list(query) };
  }

  @Get("/:id")
  async get(@Param("id") id) {
    return this.userService.get(id);
  }
}
