import { FileService } from "./file.service";
import {
  BadRequestException,
  Body,
  Param,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("/api/files")
export class FileController {
  constructor(private fileService: FileService) {}

  @Get("/:id")
  async serveAvatar(@Param("id") id, @Res() res): Promise<any> {
    res.sendFile(id, { root: "avatars" });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("upload", {
      storage: diskStorage({
        destination: "./avatars",
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
