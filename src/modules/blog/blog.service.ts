import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Blog, BlogDocument } from "./blog.schema";

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async list(): Promise<any> {
    return await this.blogModel.find().exec();
  }

  async create(data: any): Promise<any> {
    const newBlog = new this.blogModel({
      title: data.title,
      body: data.body,
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
        },
      },
      { lean: true, new: true }
    );
    return blog;
  }
  get(id: string): any {
    return this.blogModel.findOne({ _id: id });
  }
}
