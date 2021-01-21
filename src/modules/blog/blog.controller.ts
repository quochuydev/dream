import { Controller, Get, Post } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller("/api/blogs")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  list() {
    return { blogs: [] };
  }

  @Post()
  async createBlog() {
    return { success: true, blog: { id: 100, name: "test" } };
  }
}
