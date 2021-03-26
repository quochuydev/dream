import { Injectable } from "@nestjs/common";
import { decode } from "jsonwebtoken";

import { UserService } from "../user/user.service";
import { TokenService } from "../../providers/token/token.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async me(userId) {
    const user = await this.userService.findOne({
      _id: userId,
    });
    return { _id: user._id, email: user.email };
  }
}
