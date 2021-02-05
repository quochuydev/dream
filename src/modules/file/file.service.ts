import { v4 } from "uuid";
import slugify from "slugify";
import { Injectable } from "@nestjs/common";
import { File, FileDocument } from "./file.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
const baseUrl = process.env.BACKEND_URL;

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async upload(file: any, data?: Partial<File>): Promise<File> {
    const id = v4().split("-")[4];
    const key = `${id}-${slugify(file.originalname, { lower: true })}`;
    const newFile = new this.fileModel({
      key,
      contentType: file.mimetype,
      size: file.size,
      url: `${baseUrl}/api/files/${file.filename}`,
      ...data,
    });

    const photo = await newFile.save();
    return photo;
  }
}
