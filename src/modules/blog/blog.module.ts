import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BlogController } from "./blog.controller";
import { BlogV1Controller } from "./blog.v1.controller";
import { BlogService } from "./blog.service";
import { Blog, BlogSchema } from "./blog.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  providers: [BlogService],
  controllers: [BlogController, BlogV1Controller],
})
export class BlogModule {}
