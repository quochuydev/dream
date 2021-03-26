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

import { JwtGuard, UserGuard } from "../auth/jwt.guard";

@Controller("/v1/blogs")
@UseGuards(UserGuard)
export class BlogV1Controller {
  constructor(private blogService: BlogService) {}

  @Get()
  async list(@Query() query, @AuthUser("id") user_id: string) {
    return this.blogService.paginate(query, {
      keyword: "title",
      populate: "file_id",
    });
  }
}
