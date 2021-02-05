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
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      });
    }
    return config;
  },
});
