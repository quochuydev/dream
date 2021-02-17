import _ from "lodash";

import Fetch from "./fetch";

export const baseUrl =
  process.env.NODE_ENV == "production"
    ? process.env.BACKEND_URL
    : "http://localhost:8000";

import APIFactory from "./APIFactory";

export const apiFatory = (config) =>
  APIFactory({
    baseUrl,
    setHeaders: () =>
      Object({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.accessToken}`,
      }),
  });

export const API = APIFactory({
  baseUrl,
  setHeaders: (config) =>
    Object({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.accessToken}`,
    }),
});

export const APIClient = new Fetch(
  baseUrl,
  {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
  { before: [] }
);

export const APIFormData = new Fetch(
  baseUrl,
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
