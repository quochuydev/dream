import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "../user/user.module";
import { TokenModule } from "../../providers/token/token.module";
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [PassportModule, UserModule, TokenModule],
  providers: [AuthService, JwtStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
