import { Injectable } from "@nestjs/common";

import { roles } from "./role.constant";

@Injectable()
export class RoleService {
  constructor() {}

  list() {
    return roles;
  }

  get(code) {
    return roles.find((e) => e.code == code);
  }

  isAdmin(user) {
    return user.roles?.includes("admin");
  }

  isUser(user) {
    return user.roles?.includes("user");
  }
}
