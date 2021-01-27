import "dotenv/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "./modules/auth/auth.module";
import { FileModule } from "./modules/file/file.module";
import { UserModule } from "./modules/user/user.module";
import { BlogModule } from "./modules/blog/blog.module";
import { TagModule } from "./modules/tag/tag.module";
import { SSRModule } from "./server";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    FileModule,
    UserModule,
    BlogModule,
    TagModule,
    ...(process.env.NODE_ENV == "production" ? [SSRModule.forRoot()] : []),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
