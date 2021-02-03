import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { File, FileSchema } from "./file.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
