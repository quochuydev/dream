import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, message } from "antd";
import { BACKEND_URL } from "../api";

import "antd/dist/antd.css";

export default function Posts({}) {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      auth();
    }
  }, [code]);

  function auth() {
    return fetch(`${BACKEND_URL}/auth?code=${code}`, { method: "get" })
      .then((res) => {
        res.text().then((body) => {
          console.log(body);
        });
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  return <>{code}</>;
}
