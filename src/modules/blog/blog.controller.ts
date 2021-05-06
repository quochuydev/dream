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
import { JwtGuard,  } from "../auth/jwt.guard";
import { BlogDto } from "./blog.dto";

@Controller("/api/blogs")
@UseGuards(JwtGuard)
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async list(@Query() query, @AuthUser("id") userId: string) {
    return this.blogService.paginate(query, {
      keyword: "title",
      populate: "fileId",
    });
  }

  @Get("/:id")
  async detail(@Param("id") id: string) {
    return await this.blogService.get(id, {
      populate: "fileId",
    });
  }

  @Post()
  async create(@Body() data: BlogDto, @AuthUser("id") userId: string) {
    return await this.blogService.create({ ...data, userId });
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: any) {
    return await this.blogService.update(id, data);
  }

  @Delete("/:id")
  async remove(@Param("id") id: string) {
    return await this.blogService.remove(id);
  }
}
