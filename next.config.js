// const withCss = require("@zeit/next-css");
const path = require("path");

module.exports = Object({
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
});
