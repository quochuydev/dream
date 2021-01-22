import { Controller, Get, Post, Param, Body, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller("/api/blogs")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async list() {
    return { blogs: await this.blogService.list() };
  }

  @Get("/:id")
  async detail(@Param("id") id: string) {
    return await this.blogService.get(id);
  }

  @Post()
  async createBlog(@Body() data: any) {
    return await this.blogService.create(data);
  }

  @Put("/:id")
  async updateBlog(@Param("id") id: string, @Body() data: any) {
    return await this.blogService.update(id, data);
  }
}
