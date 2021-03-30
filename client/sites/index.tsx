import React from "react";

import { Layout } from "../web/components";
import Product from "../web/pages/Products";

import "antd/dist/antd.css";

export default function Index({ ...props }) {
  return (
    <Layout>
      <Product />
    </Layout>
  );
}
