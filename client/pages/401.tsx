import Router from "next/router";
import { message, Button } from "antd";

import { APIClient } from "../../client/api";
import "antd/dist/antd.css";

export default function Authetication() {
  async function loginGoogle() {
    try {
      const result = await APIClient.post("/login-google");
      window.location.href = result;
    } catch (error) {
      message.error(error.message);
    }
  }

  return (
    <>
      <h1>401</h1>
          <Button
            onClick={() => {
              loginGoogle();
            }}
          >
            login
          </Button>
      <a
        onClick={() => {
          Router.push(`/`);
        }}
      >
        Home
      </a>
    </>
  );
}