const path = require("path");

const envLocal = {
  BACKEND_URL: "http://localhost:8000",
  NEXTAUTH_URL: "http://localhost:3000",
  GOOGLE_ID:
    "423953942314-g5kp3srv5mgv4od7q9rguio724033a29.apps.googleusercontent.com",
  GOOGLE_SECRET: "TPDX-w0Mzk-_8O13RpaJ9Tcs",
  FACEBOOK_ID: "579992946118574",
  FACEBOOK_SECRET: "b1c55aed30101aac87ffc6d14517c3f4",
  DATABASE_URL: "mongodb://localhost/dream",
  SECRET: "0001",
};

const env = {
  BACKEND_URL: "https://dreamdlc.herokuapp.com",
  NEXTAUTH_URL: "https://dreamdlc.herokuapp.com",
  GOOGLE_ID:
    "423953942314-g5kp3srv5mgv4od7q9rguio724033a29.apps.googleusercontent.com",
  GOOGLE_SECRET: "TPDX-w0Mzk-_8O13RpaJ9Tcs",
  FACEBOOK_ID: "579992946118574",
  FACEBOOK_SECRET: "b1c55aed30101aac87ffc6d14517c3f4",
  DATABASE_URL:
    "mongodb+srv://quochuydev:Quochuydev548!@cluster0.qcuvq.mongodb.net/dream?retryWrites=true&w=majority",
  SECRET: "0001",
};

module.exports = Object({
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  env: process.env.NODE_ENV == "production" ? env : envLocal,
});
