import {
  BadRequestException,
  Param,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

import { FileService } from "./file.service";

@Controller("/api/files")
export class FileController {
  constructor(private fileService: FileService) {}

  @Get("/:id")
  get(@Param("id") id, @Res() res) {
    res.sendFile(id, { root: "files" });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("upload", {
      storage: diskStorage({
        destination: "./files",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async updateFile(@UploadedFile() file: any): Promise<any> {
    if (!file) {
      throw new BadRequestException("MISSING_PARAM");
    }
    return await this.fileService.upload(file, {});
  }
}
