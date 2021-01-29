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
import { JwtGuard } from "../auth/jwt.guard";
import { AuthUser } from "../../decorators";

@Controller("/api/blogs")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async list(@Query() query) {
    return this.blogService.paginate(query, { keyword: "title" });
  }

  @Get("/:id")
  async detail(@Param("id") id: string) {
    return await this.blogService.get(id);
  }

  @Get("/:id/edit")
  @UseGuards(JwtGuard)
  async edit(@Param("id") id: string) {
    return await this.blogService.get(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() data: BlogDto) {
    return await this.blogService.create(data);
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
