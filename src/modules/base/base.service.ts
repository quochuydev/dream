import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";

@Injectable()
export class BaseService {
  constructor(private model: Model<any>) {}

  async paginate(query, options: any = {}): Promise<any> {
    const result = { total: 0, items: [] };
    const { limit, skip, filter } = this.parseQuery(query);

    const criteria: any = {};
    if (filter.q) {
      const keyword = options.keyword || "name";
      criteria[keyword] = { $regex: filter.q };
    }

    console.log([limit, skip], JSON.stringify(criteria))
    result.total = await this.model.count(criteria);
    if (!result.total) {
      return result;
    }

    result.items = await this.model
      .find(criteria)
      .skip(skip)
      .limit(limit)
      .exec();
    return result;
  }

  get(id: string): any {
    return this.model.findById(id);
  }

  async remove(id) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          deleted_at: new Date(),
        },
      },
      { lean: true, new: true }
    );
  }

  parseQuery(
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
}
