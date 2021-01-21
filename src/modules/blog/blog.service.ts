import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import next from "next";
import NextServer from "next/dist/next-server/server/next-server";

import { Model } from "mongoose";
import { Blog, BlogDocument } from "../../schemas/blog.schema";

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async test(): Promise<any> {
    const newBlog = new this.blogModel({
      title: String(Math.random() * 1000),
    });

    const blog = await newBlog.save();
    console.log(blog);

    const blogs = await this.blogModel.find().exec();
    return blogs;
  }

  get(id: string): any {
    return this.blogModel.findOne({ _id: id });
  }

  create(data: any): any {
    return {};
  }
}
