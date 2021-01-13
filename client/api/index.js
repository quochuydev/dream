import Fetch from "./fetch";

const BACKEND_URL =
  process.env.NODE_ENV == "production"
    ? process.env.BACKEND_URL
    : "http://localhost:3000";

const API = new Fetch(BACKEND_URL, {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default API;
