import "dotenv/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BlogModule } from "./modules/blog/blog.module";
import { SSRModule } from "./server";

console.log("process.env.MONGO_URI", process.env.MONGO_URI);
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    BlogModule,
    SSRModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
