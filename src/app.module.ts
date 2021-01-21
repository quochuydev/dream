import { Module } from "@nestjs/common";
import { BlogModule } from "./modules/blog/blog.module";
import { SSRModule } from "./server";

@Module({
  imports: [BlogModule, SSRModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
