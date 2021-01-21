import { Injectable, OnModuleInit } from "@nestjs/common";
import next from "next";
import NextServer from "next/dist/next-server/server/next-server";

@Injectable()
export class BlogService {
  get(): any {
    return {};
  }
}
