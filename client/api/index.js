import _ from "lodash";

import Fetch from "./fetch";

export const BACKEND_URL =
  process.env.NODE_ENV == "production"
    ? process.env.BACKEND_URL
    : "http://localhost:8000";

export const API = new Fetch(
  BACKEND_URL,
  {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
  { before: [setHeader] }
);

function setHeader(config) {
  localStorage.setItem("accessToken", "accessToken");
  config.headers["accessToken"] = localStorage.getItem("accessToken");
}

function getHeader(option = {}) {
  let base = {
    accesstoken: "accessToken",
  };
  return _.assign({}, base, option);
}
