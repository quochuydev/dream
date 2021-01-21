import { Request, Response } from "express";
import {
  Module,
  DynamicModule,
  Controller,
  Get,
  Req,
  Res,
} from "@nestjs/common";
import next from "next";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client" });
const handle = app.getRequestHandler();

@Controller()
class SSRController {
  @Get("/_next/*")
  async _next(@Req() request: Request, @Res() response: Response) {
    handle(request, response);
  }

  @Get("/")
  async index(@Res() response: Response) {
    response.redirect("/blogs");
  }

  @Get("*")
  async _all(@Req() request: Request, @Res() response: Response) {
    handle(request, response);
  }
}

@Module({
  controllers: [SSRController],
})
export class SSRModule {
  static forRoot(): Promise<DynamicModule> {
    return app.prepare().then(() => {
      return {
        module: SSRModule,
      };
    });
  }
}
