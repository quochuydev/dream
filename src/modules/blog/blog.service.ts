import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import next from "next";
import NextServer from "next/dist/next-server/server/next-server";

import { Model } from "mongoose";
import { Blog, BlogDocument } from "../../schemas/blog.schema";

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

  get(id: string): any {
    return this.blogModel.findOne({ _id: id });
  }
}
