import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";

@Injectable()
export class BaseService {
  constructor(private model: Model<any>) {}

  get(id: string): any {
    return this.model.findById(id);
  }
}
