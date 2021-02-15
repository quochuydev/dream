import Router from "next/router";
import { message, Button } from "antd";

import { APIClient } from "../../client/api";
import "antd/dist/antd.css";

export default function Authetication() {

  return (
    <>
      <h1>401</h1>
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
