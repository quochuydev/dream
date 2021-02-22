import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Spin } from "antd";

import { useCookies } from "react-cookie";

import { API, APIClient } from "../../api";

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
      console.log(code)
      const accessToken = await APIClient.post(`/auth`, { body: { code } });
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        const user = await API.get(`/auth/me`, { accessToken });
        console.log(user);
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
