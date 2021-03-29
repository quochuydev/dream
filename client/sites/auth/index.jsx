import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import jsCookie from "js-cookie";

import { API, APIClient } from "../../api";
import { Loading } from "../../components";

import "antd/dist/antd.css";

export default function Auth({}) {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      auth();
    }
  }, [code]);

  async function auth() {
    try {
      const accessToken = await APIClient.post(`/auth`, { body: { code } });
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        jsCookie.set("accessToken", accessToken);
        const user = await API.get(`/auth/me`, { accessToken });
        localStorage.setItem("me", user.email);
      }
    } catch (error) {
      console.log(error);
    }
    Router.push("/blogs");
  }

  return <Loading />;
}
