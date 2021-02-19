import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { decode } from "jsonwebtoken";

import { UserService } from "../user/user.service";
import { TokenService } from "../../providers/token/token.service";

const google_app = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUrl: process.env.REDIRECT_URL,
};

const { clientId, clientSecret, redirectUrl } = google_app;
const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl
);
const scopes = ["email", "profile", "openid"];
const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async buildLink() {
    return url;
  }

  async auth(code) {
    const { tokens } = await oauth2Client.getToken(code);
    const userAuth = decode(tokens.id_token);
    if (!userAuth.email) {
      throw { status: 401 };
    }

    const user = await this.userService.upsertByEmail({
      email: userAuth.email,
    });
    const user_gen_token = {
      sub: user._id,
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const userToken = this.tokenService.signJwt(
      "ACCESS_TOKEN",
      user_gen_token,
      "30d"
    );
    return userToken;
  }

  async me(userId) {
    const user = await this.userService.findOne({
      _id: userId,
    });
    return { _id: user._id, email: user.email };
  }
}
