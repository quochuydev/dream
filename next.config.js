// const withCss = require("@zeit/next-css");
const path = require("path");
console.log(path.join(__dirname, "client/styles"));
module.exports = Object({
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
});
