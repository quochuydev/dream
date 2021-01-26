import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Spin } from "antd";

import { API, APIClient } from "../../api";

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
      const accessToken = await APIClient.post(`/auth`, { code });
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        const user = await API.get(`/auth/me`);
        localStorage.setItem("me", user.email);
      }
    } catch (error) {
      console.log(error);
    }
    Router.push("/");
  }

  return (
    <>
      <div className="spin-center">
        <Spin />
      </div>
    </>
  );
}
