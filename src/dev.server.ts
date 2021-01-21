import express from "express";
import next from "next";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });

  server.all("*", (req, res) => {
    handle(req, res);
  });

  server.listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
