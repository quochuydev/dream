const next = require("next");
const path = require("path");
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
const { TagModel } = require("./models/tag");
const { UserModel } = require("./models/user");

var multer = require("multer");
var fs = require("fs-extra");
var upload = multer({ dest: "uploads/" });
const { Route } = require("./core/route");

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });
  const { uploadToDisk } = require("./upload");

  const { loginGoogle, auth } = require("./loginGoogle");

  server.post("/login-google", loginGoogle);
  server.get("/auth", auth);

  server.get("/uploads/:filename", function (req, res) {
    let fileName = req.params.filename;
    let fullPath = path.join(path.resolve("./uploads"), fileName);
    fs.exists(fullPath, function (exists) {
      if (!exists) {
        throw { message: "File không tồn tại!" };
      }
      let name = path.basename(fullPath);
      res.setHeader("Content-disposition", "attachment; filename=" + name);
      let filestream = fs.createReadStream(fullPath);
      filestream.pipe(res);
      return true;
    });
  });

  server.use("/api/*", async (req, res, next) => {
    if (req.headers["accesstoken"] != "accessToken") {
      return res.status(401).send();
    }
    next();
  });

  server.post("/api/files", uploadToDisk.single("upload"), async (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400);
    }
    res.json({ uploaded: true, url: `http://localhost:${PORT}/${file.path}` });
  });

  Api = new Route(server);

  Api.addRoute("/api/blogs", {
    async get() {
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
