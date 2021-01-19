import { Controller, Get } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller("/api/blogs")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  list() {
    return { blogs: [] };
  }
}
