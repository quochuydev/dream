import "dotenv/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BlogModule } from "./modules/blog/blog.module";
import { SSRModule } from "./server";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    BlogModule,
    SSRModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
