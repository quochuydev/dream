import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { isAdmin, isUser } from "./auth.common";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
  handleRequest(err, user, info: Error) {
    if (!user) {  
      return null;
    }
    return user;
  }
}
