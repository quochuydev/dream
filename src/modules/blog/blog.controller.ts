import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Query,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogDto } from "./blog.dto";
import { AuthUser } from "../../decorators";

import { JwtGuard } from "../auth/jwt.guard";
import { AuthenticatedGuard } from "../auth/authenticated.guard";

@Controller("/api/blogs")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  async list(@Query() query) {
    return this.blogService.paginate(query, {
      keyword: "title",
      populate: "file_id",
    });
  }

  @Get("/u")
  @UseGuards(JwtGuard)
  async uList(@Query() query) {
    return this.blogService.paginate(query, {
      keyword: "title",
      populate: "file_id",
    });
  }

  @Get("/:id")
  async detail(@Param("id") id: string) {
    return await this.blogService.get(id, {
      populate: "file_id",
    });
  }

  @Get("/u/:id")
  @UseGuards(JwtGuard)
  async edit(@Param("id") id: string) {
    return await this.blogService.get(id, {
      populate: "file_id",
    });
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() data: BlogDto, @AuthUser("id") user_id: string) {
    return await this.blogService.create({ ...data, user_id });
  }

  @Put("/:id")
  @UseGuards(JwtGuard)
  async update(@Param("id") id: string, @Body() data: any) {
    return await this.blogService.update(id, data);
  }

  @Delete("/:id")
  @UseGuards(JwtGuard)
  async remove(@Param("id") id: string) {
    return await this.blogService.remove(id);
  }
}
