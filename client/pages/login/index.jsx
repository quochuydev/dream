import Router from "next/router";
import { message, Button } from "antd";

import { APIClient, loginGoogle } from "../../../client/api";
import "antd/dist/antd.css";

export default function Authetication() {
  return (
    <>
          <Button
            onClick={() => {
              loginGoogle();
            }}
          >
            login
          </Button>
    
    </>
  );
}
