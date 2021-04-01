const path = require("path");

console.log('in next', process.env.DATABASE_URL);

const envLocal = {
  BACKEND_URL: "http://localhost:8000",
  NEXTAUTH_URL: "http://localhost:3000",
  GOOGLE_ID:
    "423953942314-g5kp3srv5mgv4od7q9rguio724033a29.apps.googleusercontent.com",
  GOOGLE_SECRET: "TPDX-w0Mzk-_8O13RpaJ9Tcs",
  DATABASE_URL: "mongodb://localhost/dream",
  SECRET: "",
};

const env = {
  BACKEND_URL: "https://dreamdlc.herokuapp.com",
  NEXTAUTH_URL: "https://dreamdlc.herokuapp.com",
  GOOGLE_ID:
    "423953942314-g5kp3srv5mgv4od7q9rguio724033a29.apps.googleusercontent.com",
  GOOGLE_SECRET: "TPDX-w0Mzk-_8O13RpaJ9Tcs",
  DATABASE_URL:
    "mongodb+srv://quochuydev:Quochuydev548!@cluster0.qcuvq.mongodb.net/dream?retryWrites=true&w=majority",
  SECRET: "",
};

module.exports = Object({
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  env: process.env.NODE_ENV == "production" ? env : envLocal,
});
