const path = require("path");

module.exports = Object({
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    GOOGLE_ID:
      "423953942314-g5kp3srv5mgv4od7q9rguio724033a29.apps.googleusercontent.com",
    GOOGLE_SECRET: "TPDX-w0Mzk-_8O13RpaJ9Tcs",
    NEXTAUTH_URL: "http://localhost:3000",
    DATABASE_URL: process.env.DATABASE_URL,
    SECRET: "",
  },
});
