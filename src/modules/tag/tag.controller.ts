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
import { TagService } from "./tag.service";
import { TagDto } from "./tag.dto";

@Controller("/api/tags")
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  async list(@Query() query) {
    return this.tagService.paginate(query);
  }

  @Get("/:id")
  async detail(@Param("id") id: string) {
    return await this.tagService.get(id);
  }

  @Post()
  async create(@Body() data: TagDto) {
    return await this.tagService.create(data);
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: TagDto) {
    return await this.tagService.update(id, data);
  }

  @Delete("/:id")
  async remove(@Param("id") id: string) {
    return await this.tagService.remove(id);
  }
}
