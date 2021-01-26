import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Spin } from "antd";

import { APIClient } from "../api";

import "antd/dist/antd.css";
import "./style.css";

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
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        const user = await APIClient.get(`/api/me`, { token: accessToken });
        localStorage.setItem("me", user.email);
      }
    } catch (error) {
      console.log(error);
    }
    Router.push("/blogs");
  }

  return (
    <>
      <div className="spin-center">
        <Spin />
      </div>
    </>
  );
}
