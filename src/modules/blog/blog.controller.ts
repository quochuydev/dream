import { Controller, Get, Post, Param, Body, Put, Query } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogDto } from "./blog.dto";

@Controller("/api/blogs")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async list(@Query() query) {
    return { blogs: await this.blogService.list(query) };
  }

  @Get("/:id")
  async detail(@Param("id") id: string) {
    return await this.blogService.get(id);
  }

  @Post()
  async createBlog(@Body() data: BlogDto) {
    return await this.blogService.create(data);
  }

  @Put("/:id")
  async updateBlog(@Param("id") id: string, @Body() data: BlogDto) {
    return await this.blogService.update(id, data);
  }
}
