import React from "react";
import { Card, Row, Col, Slider, Tag } from "antd";

import { ProductCard } from "../../../components";

import "antd/dist/antd.css";

export default function Index({ ...props }) {
  const products = [
    {
      _id: "1",
    },
    {
      _id: "2",
    },
    {
      _id: "3",
    },
    {
      _id: "4",
    },
  ];

  return (
    <>
      <h1>Products</h1>
      <Row gutter={15}>
        {products.map((e, i) => (
          <Col span={6} key={e._id}>
            <ProductCard />
          </Col>
        ))}
      </Row>
    </>
  );
}
