import _ from "lodash";

import Fetch from "./fetch";

export const BACKEND_URL =
  process.env.NODE_ENV == "production"
    ? process.env.BACKEND_URL
    : "http://localhost:8000";

import APIFactory from "./APIFactory";
export const API = APIFactory({
  baseUrl: BACKEND_URL,
  setHeaders: (config) => Object({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.accessToken}`,
  }),
});

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

export const APIFormData = new Fetch(
  process.env.BACKEND_URL,
  {
    headers: {},
  },
  { befores: [setConfigFormData], errors: [] }
);

function setConfigFormData(config) {
  const accessToken = getToken();
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);

  config.headers = headers;
  config.notStringifyBody = true;
  return config;
}

export function getToken() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return "";
  }
  return token;
}

export function getHeader(option = {}) {
  let base = {
    accesstoken: getToken(),
  };
  return _.assign({}, base, option);
}
