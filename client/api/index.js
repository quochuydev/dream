import _ from "lodash";

import Fetch from "./fetch";

export const BACKEND_URL =
  process.env.NODE_ENV == "production"
    ? process.env.BACKEND_URL
    : "http://localhost:8000";

export const APIClient = new Fetch(
  BACKEND_URL,
  {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
  { before: [] }
);

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

export const APIFormData = new Fetch(
  process.env.BACKEND_URL,
  {
    headers: {},
  },
  { befores: [setHeaderFD], errors: [] }
);

function getToken() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    window.location.href = "/";
    return;
  }
}

function getHeader(option = {}) {
  let base = {
    accesstoken: getToken(),
  };
  return _.assign({}, base, option);
}

function setHeader(config) {
  config.headers["accessToken"] = getToken();
}

function setHeaderFD(config) {
  const accessToken = getToken();

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);

  config.headers = headers;
  return config;
}
