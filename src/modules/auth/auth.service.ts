import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import jwt from "jsonwebtoken";

import { UserService } from "../user/user.service";

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
  constructor(private readonly userService: UserService) {}

  async buildLink() {
    return url;
  }

  async auth(code) {
    const { tokens } = await oauth2Client.getToken(code);
    const userAuth = jwt.decode(tokens.id_token);
    if (!userAuth.email) {
      throw { status: 401 };
    }

    const user = await this.userService.upsertByEmail({
      email: userAuth.email,
    });
    const user_gen_token = {
      email: user.email,
      exp: (Date.now() + 8 * 60 * 60 * 1000) / 1000,
    };

    const userToken = jwt.sign(user_gen_token, "hash_token");
    return userToken;
  }

  async me(token) {
    const userAuth = jwt.verify(token, "hash_token");
    return { email: userAuth.email };
  }
}