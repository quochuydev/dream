import { Injectable, UnauthorizedException } from "@nestjs/common";
import {
  decode,
  DecodeOptions,
  sign,
  SignOptions,
  verify,
  VerifyOptions,
} from "jsonwebtoken";
import { v4 } from "uuid";

@Injectable()
export class TokenService {
  private securityConfig = {
    jwtSecret: "hash_token",
  };

  signJwt(
    jwtType: string,
    payload: Record<string, unknown>,
    expiresIn?: string,
    options?: SignOptions
  ) {
    return sign({ ...payload, typ: jwtType }, this.securityConfig.jwtSecret, {
      ...options,
      expiresIn,
    });
  }

  verify<T>(jwtType: string, token: string, options?: VerifyOptions): T | any {
    try {
      const result = (verify(
        token,
        this.securityConfig.jwtSecret,
        options
      ) as any) as T;
      if ("typ" in result) {
        if ((result as { typ?: string }).typ !== jwtType) throw new Error();
      } else throw new Error();
      return result;
    } catch (error) {
      throw new UnauthorizedException("TOKEN_INVALID");
    }
  }

  decode<T>(token: string, options?: DecodeOptions) {
    return decode(token, options) as T;
  }

  generateUuid() {
    return v4();
  }
}
