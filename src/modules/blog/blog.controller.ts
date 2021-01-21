import { Controller, Get, Post, Param } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller("/api/blogs")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async list() {
    return { blogs: await this.blogService.test() };
  }

  @Get("/:id")
  async detail(@Param("id") id: string) {
    return await this.blogService.get(id);
  }

  @Post()
  async createBlog() {
    return { success: true, blog: { id: 100, name: "test" } };
  }
}
