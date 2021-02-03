const withCss = require("@zeit/next-css");

module.exports = withCss({
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    FILE_SERVICE_URL: process.env.FILE_SERVICE_URL,
  },
});
