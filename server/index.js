const next = require("next");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get("/_next/*", (req, res) => {
    handle(req, res);
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
    const blog = await BlogModel.create({ title: data.title, body: data.body });
    res.json(blog);
  });

  server.put("/api/blogs/:id", async (req, res) => {
    const data = req.body;
    const blog = await BlogModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: data.title,
        body: data.body,
      },
      {
        lean: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
    res.json(blog);
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
