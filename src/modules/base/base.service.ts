import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";

@Injectable()
export class BaseService {
  constructor(private model: Model<any>) {}

  async paginate(query, props: any = { options: {} }): Promise<any> {
    const { keyword, ...options } = props;
    const { page, limit, skip, filter } = this.parseQuery(query);
    const result = { total: 0, totalPage: 0, limit, page, skip, items: [] };

    const criteria: any = {};

    if (filter.all != "true") {
      criteria.deletedAt = { $in: [null] };
    }

    if (filter.q) {
      const keyword = options.keyword || "name";
      criteria[keyword] = { $regex: filter.q };
    }

    console.log(
      new Date().toISOString(),
      [limit, skip],
      JSON.stringify(criteria)
    );
    result.total = await this.model.count(criteria);
    if (!result.total) {
      return result;
    }
    result.totalPage = Math.ceil(result.total/result.limit)

    result.items = await this.model
      .find(criteria, null, options)
      .skip(skip)
      .limit(limit)
      .exec();
    return result;
  }

  async get(id: string, options = {}) {
    const result = await this.model.findById(id, null, {
      ...options,
    });
    return result;
  }

  async remove(id) {
    const blog = await this.model.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          deletedAt: new Date(),
        },
      },
      { lean: true, new: true, upsert: true }
    );

    return blog;
  }

  parseQuery(
    body,
    option = { writeLog: true, maxLimit: 500 },
    defaults = { page: 1, limit: 20, fields: "", sort: { createdAt: -1 } }
  ) {
    let { page = 1, limit = 20 } = { ...defaults, ...body };
    page = Number(page);
    limit = Math.min(Number(limit), option.maxLimit);
    const skip = (page - 1) * limit;

    delete body.limit;
    delete body.page;
    const filter = body;
    return { limit, page, skip, filter };
  }
}
