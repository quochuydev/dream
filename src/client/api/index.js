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
}, { before: [setHeader] });

function setHeader(config){
  localStorage.setItem('accessToken', 'accessToken')
  config.headers['accessToken'] = localStorage.getItem('accessToken')
}

export default API;
