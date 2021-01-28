import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  deleted_at: Date;
}

export const BlogSchema = new mongoose.Schema({
  title: { type: String, default: null },
  body: { type: String, default: "" },
  tags: {
    type: [
      {
        value: { type: String, default: null },
        label: { type: String, default: null },
      },
    ],
    default: [],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});
