import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";

import List from "./List";
import Filter from "./Filter";
import { Layout, Slider } from "../../components";

export default function Products() {
  return (
    <Layout>
      <Slider />
      <Row gutter={[15, 15]}>
        <Col xs={24} md={6}>
          <Filter />
        </Col>
        <Col xs={24} md={18}>
          <List />
        </Col>
      </Row>
    </Layout>
  );
}
