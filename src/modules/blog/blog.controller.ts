import {
  Controller,
  Get,
  Param,
  Query,
} from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller("/api/blogs")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async list(@Query() query) {
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
}