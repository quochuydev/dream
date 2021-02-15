// const withCss = require("@zeit/next-css");

module.exports = Object({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  },
});