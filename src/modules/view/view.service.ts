import { Injectable, OnModuleInit } from "@nestjs/common";
import next from "next";
import NextServer from "next/dist/next-server/server/next-server";
const dev = process.env.NODE_ENV !== "production";

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      console.log(dev);
      this.server = next({ dev, dir: "./client" });
      await this.server.prepare();
    } catch (error) {
      console.log(error);
    }
  }

  getNextServer(): NextServer {
    console.log(dev);
    return this.server;
  }
}
