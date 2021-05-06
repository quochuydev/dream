import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop()
  title: string;

  @Prop()
  slug: string;

  @Prop()
  body: string;

  @Prop()
  fileId: string;

  @Prop()
  userId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const BlogSchema = new mongoose.Schema({
  title: { type: String, default: null },
  slug: { type: String, default: null },
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
  fileId: { type: String, default: null, ref: "File" },

  userId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});
