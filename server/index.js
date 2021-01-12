const next = require("next");
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/dream", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { BlogModel } = require("./models/blog");

app.prepare().then(() => {
  const server = express();

  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });

  server.get("/blogs", async (req, res) => {
    app.render(req, res, "/blogs");
  });

  server.get("/blogs/:id", async (req, res) => {
    const blog = await BlogModel.findOne({ _id: req.params.id });
    app.render(req, res, "/blogs/detail", { id: req.params.id, blog });
  });

  server.get("/api/blogs", async (req, res) => {
    const blogs = await BlogModel.find({}).lean(true);
    res.json({ blogs });
  });

  server.post("/api/blogs", async (req, res) => {
    const blog = await BlogModel.create({ title: "test" });
    res.json({ blog });
  });

  server.get("/", (req, res) => res.redirect("/blogs"));

  server.all("*", (req, res) => {
    handle(req, res);
  });

  server.listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
