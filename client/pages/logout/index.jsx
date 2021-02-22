import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Spin } from "antd";

import { useCookies } from "react-cookie";

import { API, APIClient } from "../../api";

import "antd/dist/antd.css";

export default function Auth({}) {
  useEffect(() => {
    logout()
  }, []);

  async function logout(){
    localStorage.clear()
    await API.post(`/auth/logout`);
    Router.push("/");
    return;
  }

  return (
    <>
      <div className="spin-center">
        <Spin />
      </div>
    </>
  );
}
