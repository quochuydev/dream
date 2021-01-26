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

function setHeader(config) {
  config.headers["accessToken"] = localStorage.getItem("accessToken");
}

function setHeaderFD(config) {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken && config.noNeedToken) {
    localStorage.clear();
    window.location.href = LOGIN_ROUTE;
    return;
  }
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  config.headers = headers;
  return config;
}

function getHeader(option = {}) {
  let base = {
    accesstoken: "accessToken",
  };
  return _.assign({}, base, option);
}
