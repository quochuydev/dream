import { RoleService } from "./role.service";
import { Param, Controller, Get, Query, UseGuards } from "@nestjs/common";

@Controller("/api/roles")
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async list(@Query() query) {
    return { roles: await this.roleService.list() };
  }

  @Get("/:id")
  async get(@Param("id") id) {
    return await this.roleService.get(id);
  }
}
