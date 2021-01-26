import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  url: string;

  @Prop()
  key: string;

  @Prop()
  contentType: string;

  @Prop()
  size: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const UserSchema = new mongoose.Schema({
  url: { type: String, default: null },
  key: { type: String, default: null },
  contentType: { type: String, default: null },
  size: { type: Number, default: null },
  createdAt: { type: Date, default: null },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});
