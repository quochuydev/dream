import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "../base/base.service";

import { Blog, BlogDocument } from "./blog.schema";

@Injectable()
export class BlogService extends BaseService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    super(blogModel);
  }

  async create(data: any): Promise<any> {
    if (!data.title) {
      throw new BadRequestException("Missing title");
    }

    const newBlog = new this.blogModel({
      title: data.title,
      slug: toSlug(data.titile),
      body: data.body,
      tags: data.tags,
    });
    const blog = await newBlog.save();
    return blog;
  }

  async update(id: string, data: any): Promise<any> {
    const blog = await this.blogModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: data.title,
          body: data.body,
          tags: data.tags,
          updated_at: new Date(),
        },
      },
      { lean: true, new: true }
    );
    return blog;
  }
}

function toSlug(text) {
  return (
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "") +
    "-" +
    Date.now()
  );
}
