import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Query,
  Delete,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogDto } from "./blog.dto";

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

  @Post()
  async create(@Body() data: BlogDto) {
    return await this.blogService.create(data);
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: BlogDto) {
    return await this.blogService.update(id, data);
  }

  @Delete("/:id")
  async remove(@Param("id") id: string) {
    return await this.blogService.remove(id);
  }
}
