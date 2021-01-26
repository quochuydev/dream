import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop()
  title: string;
  5;
  @Prop()
  body: string;
}

export const BlogSchema = new mongoose.Schema({
  title: { type: String, default: null },
  body: { type: String, default: "" },
  tags: { type: Array, default: [] },
});
