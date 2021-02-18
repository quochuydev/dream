import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findOne(criteria) {
    return this.userModel.findOne(criteria);
  }

  async list(query) {
    const result = await this.userModel.find({});
    // console.log(result)
    return result
  }

  get(id) {
    return this.userModel.findById(id);
  }

  async create(data) {
    const newUser = new this.userModel(data);
    const user = await newUser.save();
    return user;
  }

  async upsertByEmail(data) {
    let user = await this.findOne({ email: data.email });
    if (!user) {
      user = await this.create({ email: data.email });
    }
    return user;
  }
}
