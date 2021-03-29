import React from "react";

import "antd/dist/antd.css";

import { Layout } from "../components";
import Product from "./Product";

export default function Index({ ...props }) {
  return (
    <Layout>
      <Product />
    </Layout>
  );
}
