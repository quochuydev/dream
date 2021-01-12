const next = require("next");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
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

  server.use((err, req, res, next) => {
    if (err) {
      return res.status(500).send(err);
    }
    next();
  });

  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
