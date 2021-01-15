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

  class API {
    constructor(server) {
      this.server = server;
      this.req = null;
      this.res = null;
    }

    addRoute(route, func) {
      for (let key in func) {
        this.server[key](route, async (req, res) => {
          try {
            func.body = req.body;
            func.params = req.params;
            func.query = req.query;
            const result = await func[key]();
            res.json(result);
          } catch (error) {
            res.status(400).send(error);
          }
        });
      }
    }
  }

  Api = new API(server);

  Api.addRoute("/api/blogs", {
    async get() {
      console.log(this.query);
      const blogs = await BlogModel.find({}).lean(true);
      return { blogs };
    },

    async post() {
      const data = this.body;
      if (!data.title) {
        throw { message: "invalid data" };
      }
      const blog = await BlogModel.create({
        title: data.title,
        body: data.body,
      });
      return blog;
    },
  });

  Api.addRoute("/api/blogs/:id", {
    async get() {
      const blog = await BlogModel.findOne({ _id: this.params.id }).lean(true);
      return blog;
    },

    async put() {
      const data = this.body;
      if (!data.title) {
        throw { message: "Invalid data!" };
      }
      const blog = await BlogModel.findOneAndUpdate(
        { _id: this.params.id },
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
      return blog;
    },

    async delete() {
      await BlogModel.remove({ _id: this.params.id });
      return { success: true };
    },
  });

  Api.addRoute("/api/tags", {
    async get() {
      const tags = await TagModel.find({}).lean(true);
      return { tags };
    },

    async post() {
      const data = this.body;
      if (!data.name) {
        throw { message: "invalid data" };
      }
      const tag = await TagModel.create({ name: data.name });
      return tag;
    },
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
