import React from "react";
import { Row, Col } from "antd";

import "antd/dist/antd.css";

import List from "./List";
import Filter from "./Filter";
import { Layout } from "../../components";

export default function Products() {
  return (
    <Layout>
      <Row gutter={15}>
        <Col span={8}>
          <Filter />
        </Col>
        <Col span={16}>
          <List />
        </Col>
      </Row>
    </Layout>
  );
}
