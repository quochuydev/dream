import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, message } from "antd";
import { BACKEND_URL, APIClient } from "../api";
import { noSSRWithLoadingDynamic } from "../utils/dynamic.import";

import "antd/dist/antd.css";

export default noSSRWithLoadingDynamic(Auth);

function Auth({}) {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      console.log(code);
      auth();
    }
  }, [code]);

  async function auth() {
    const result = await APIClient.get(`auth`, { code });
    console.log(result);
  }

  return <>{code}</>;
}
