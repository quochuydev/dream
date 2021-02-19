import "dotenv/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "./modules/auth/auth.module";
import { FileModule } from "./modules/file/file.module";
import { BlogModule } from "./modules/blog/blog.module";
import { TagModule } from "./modules/tag/tag.module";
import { SSRModule } from "./server";
import { UserModule } from "./modules/user/user.module";
import { RoleModule } from "./modules/role/role.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    FileModule,
    UserModule,
    RoleModule,
    BlogModule,
    TagModule,
    ...(process.env.NODE_ENV == "production" ? [SSRModule.forRoot()] : []),
  ],
  controllers: [],
})
export class AppModule {}
