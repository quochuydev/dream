import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "../base/base.service";

import { Blog, BlogDocument } from "./blog.schema";

@Injectable()
export class BlogService extends BaseService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    super(blogModel);
  }

  async paginate(query): Promise<any> {
    const result = { total: 0, items: [] };
    const { limit, skip, filter } = parseQuery(query);

    const criteria: any = {};
    if (filter.q) {
      criteria.title = { $regex: filter.q };
    }

    result.total = await this.blogModel.count(criteria);
    if (!result.total) {
      return result;
    }

    result.items = await this.blogModel
      .find(criteria)
      .skip(skip)
      .limit(limit)
      .exec();
    return result;
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
}

function parseQuery(
  body,
  option = { writeLog: true, maxLimit: 500 },
  defaults = { page: 1, limit: 20, fields: "", sort: { created_at: -1 } }
) {
  let { page = 1, limit = 20 } = { ...defaults, ...body };
  page = Number(page);
  limit = Math.min(Number(limit), option.maxLimit);
  let skip = (page - 1) * limit;

  delete body.limit;
  delete body.page;
  const filter = body;
  return { limit, page, skip, filter };
}
