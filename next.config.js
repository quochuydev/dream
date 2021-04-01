const path = require("path");

console.log(process.env.DATABASE_URL);

module.exports = Object({
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  env: {
    BACKEND_URL: "https://dreamdlc.herokuapp.com",
    GOOGLE_ID:
      "423953942314-g5kp3srv5mgv4od7q9rguio724033a29.apps.googleusercontent.com",
    GOOGLE_SECRET: "TPDX-w0Mzk-_8O13RpaJ9Tcs",
    NEXTAUTH_URL: "https://dreamdlc.herokuapp.com",
    DATABASE_URL:
      "mongodb+srv://quochuydev:Quochuydev548!@cluster0.qcuvq.mongodb.net/dream?retryWrites=true&w=majority",
    SECRET: "",
  },
  publicRuntimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
