import _ from "../admin/components/Thumbnail/node_modules/lodash";

export const baseUrl =
  process.env.NODE_ENV == "production"
    ? process.env.BACKEND_URL
    : "http://localhost:8000";

import APIFactory from "./APIFactory";

import cookie from "cookie";

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export const getServerToken = (ctx) => {
  const req = ctx?.req;
  const accessToken = req?.cookies["accessToken"];
  return accessToken;
};

export const hasToken = (ctx) => {
  return !!getServerToken(ctx);
};

export const apiFatory = (ctx) => {
  const accessToken = getServerToken(ctx);
  return APIFactory({
    baseUrl,
    setHeaders: () =>
      Object({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }),
  });
};

export const APIFormData = APIFactory({
  baseUrl,
  notStringify: true,
  setHeaders: () => {
    const accessToken = "";
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

export function getHeader(option = {}) {
  let base = {
    accesstoken: "",
  };
  return _.assign({}, base, option);
}
