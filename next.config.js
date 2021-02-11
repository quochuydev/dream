const withCss = require("@zeit/next-css");

module.exports = withCss({
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  },
});