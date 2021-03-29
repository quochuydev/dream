import React, { useEffect } from "react";
import Router from "next/router";
import { API } from "../../api";
import { Loading } from "../../components";

import "antd/dist/antd.css";

function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=0";
}

export default function Auth({}) {
  useEffect(() => {
    logout();
  }, []);

  async function logout() {
    localStorage.clear();
    await API.post(`/auth/logout`, { body: {} });
    eraseCookie("accessToken");
    Router.push("/");
    return;
  }

  return <Loading />;
}
