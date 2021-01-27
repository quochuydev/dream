import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StringDecoder } from "string_decoder";

import { Blog, BlogDocument } from "./blog.schema";

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async paginate(query): Promise<any> {
    const criteria: any = {};
    if (query.q) {
      criteria.title = { $regex: query.q };
    }
    const page = Number(query.page);
    const limit = Number(query.limit);
    const skip = Math.ceil(limit * (page - 1));

    return {
      total: await this.blogModel.count(criteria),
      blogs: await this.blogModel.find(criteria).skip(skip).limit(limit).exec(),
    };
  }

  async list(query): Promise<any> {
    const criteria: any = {};
    if (query.q) {
      criteria.title = { $regex: query.q };
    }
    const page = Number(query.page);
    const limit = Number(query.limit);
    const skip = Math.ceil(limit * (page - 1));
    return await this.blogModel.find(criteria).skip(skip).limit(limit).exec();
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
          updated_at: new Date(),
        },
      },
      { lean: true, new: true }
    );
    return blog;
  }

  async remove(id) {
    const blog = await this.blogModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          deleted_at: new Date(),
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
