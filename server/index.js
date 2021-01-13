const next = require("next");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

var multer = require("multer");
var upload = multer({ dest: "uploads/" });

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
const { TagModel } = require("./models/tag");

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });

  server.post("/api/files", upload.single("upload"), async (req, res) => {
    const data = req.body;
    const file = req.file;
    res.json({
      uploaded: true,
      url:
        "https://cdn.tuoitre.vn/zoom/504_315/2021/1/13/trump-1610512805643570101638-crop-1610512812069805927149.jpg",
    });
  });

  server.get("/api/blogs", async (req, res) => {
    const blogs = await BlogModel.find({}).lean(true);
    res.json({ blogs });
  });

  server.get("/api/blogs/:id", async (req, res) => {
    const blog = await BlogModel.findOne({ _id: req.params.id }).lean(true);
    res.json(blog);
  });

  server.post("/api/blogs", async (req, res) => {
    const data = req.body;
    if (!data.title) {
      return res.json({ message: "invalid data" });
    }
    const blog = await BlogModel.create({ title: data.title, body: data.body });
    res.json(blog);
  });

  server.put("/api/blogs/:id", async (req, res) => {
    const data = req.body;
    if (!data.title) {
      return res.json({ message: "invalid data" });
    }
    const blog = await BlogModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: data.title,
          body: data.body,
          tags: data.tags,
        },
      },
      {
        lean: true,
        new: true,
      }
    );
    res.json(blog);
  });

  server.delete("/api/blogs/:id", async (req, res) => {
    await BlogModel.remove({ _id: req.params.id });
    res.json({ success: true });
  });

  server.get("/api/tags", async (req, res) => {
    const tags = await TagModel.find({}).lean(true);
    res.json({ tags });
  });

  server.post("/api/tags", async (req, res) => {
    const data = req.body;
    if (!data.name) {
      return res.status(400).json({ message: "invalid data" });
    }
    const tag = await TagModel.create({ name: data.name });
    res.json(tag);
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
