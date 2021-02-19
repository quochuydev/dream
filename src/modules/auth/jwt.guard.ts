import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { isAdmin, isUser } from "./auth.common";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
  handleRequest(err, user, info: Error) {
    console.log(user)
    if (!user) {
      return null;
    }
    return user;
  }
}

@Injectable()
export class UserGuard extends AuthGuard("jwt") {
  handleRequest(err, user, info: Error) {
    if (user && (isAdmin(user) || isUser(user))) {
      return user;
    }
    throw new UnauthorizedException();
  }
}

@Injectable()
export class AdminGuard extends AuthGuard("jwt") {
  handleRequest(err, user, info: Error) {
    if (user && isAdmin(user)) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
