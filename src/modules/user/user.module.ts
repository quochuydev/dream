import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserSeed } from "./user.seed";
import { User, UserSchema } from "./user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserSeed],
  exports: [UserService, UserSeed],
})
export class UserModule {}
