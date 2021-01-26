import React, { useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import { Button, message } from "antd";
import { BACKEND_URL, APIClient } from "../api";

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
      const accessToken = await APIClient.get(`/api/auth`, { code });
      localStorage.setItem("accessToken", accessToken);
      if (accessToken) {
        const user = await APIClient.get(`/api/me`, { token: accessToken });
        localStorage.setItem("me", user.email);
      }
    } catch (error) {
      console.log(error);
    }
    Router.push("/blogs");
  }

  return <>{code}</>;
}
