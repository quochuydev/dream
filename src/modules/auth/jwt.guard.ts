import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
  handleRequest(err, user, info: Error) {
    if(!user){
      return null;
    }
    console.log(user);
    return user;
  }
}

@Injectable()
export class AdminGuard extends AuthGuard("jwt") {
  handleRequest(err, user, info: Error) {
    if(!user){
      throw new UnauthorizedException();
    }
    if(!user.roles?.includes('admin')){
      throw new UnauthorizedException();
    }
    return user;
  }
}


