import Router from "next/router";
import { message, Button } from "antd";

import { loginGoogle } from "../../client/api";
import "antd/dist/antd.css";

export default function Authetication() {

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
