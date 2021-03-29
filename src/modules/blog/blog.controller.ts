import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { AuthUser } from "../../decorators";
import { JwtGuard, UserGuard } from "../auth/jwt.guard";
import { BlogDto } from "./blog.dto";

@Controller("/api/blogs")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  @UseGuards(JwtGuard)
  async list(@Query() query, @AuthUser("id") user_id: string) {
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
