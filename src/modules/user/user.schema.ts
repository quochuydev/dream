import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  deleted_at: Date;
}

export const UserSchema = new mongoose.Schema({
  email: { type: String, default: null },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  username: { type: String, default: null },
  password: { type: String, default: null },
  salt: { type: String, default: null },
  phone: { type: String, default: null },
  roles: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});
