import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    console.log("user", user);
    if (!user) {
      return null;
    }
    return data ? user && user[data] : user;
  }
);
