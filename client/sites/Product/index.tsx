import React from "react";
import { Row, Col } from "antd";

import "antd/dist/antd.css";

import List from "./List";
import Filter from "./Filter";

export default function Index({ ...props }) {
  return (
    <Row gutter={15}>
      <Col span={8}>
        <Filter />
      </Col>
      <Col span={16}>
        <List />
      </Col>
    </Row>
  );
}
