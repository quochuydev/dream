import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "../base/base.service";

import { Tag, TagDocument } from "./tag.schema";

@Injectable()
export class TagService extends BaseService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {
    super(tagModel);
  }

  async create(data: any): Promise<any> {
    const newTag = new this.tagModel({
      name: data.name,
    });
    const tag = await newTag.save();
    return tag;
  }

  async update(id: string, data: any): Promise<any> {
    const tag = await this.tagModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: data.name,
          updatedAt: new Date(),
        },
      },
      { lean: true, new: true }
    );
    return tag;
  }
}
