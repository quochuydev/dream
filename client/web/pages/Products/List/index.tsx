import React from "react";
import { Row, Col } from "antd";

import { ProductCard } from "../../../components";

import "antd/dist/antd.css";

export default function ProductList() {
  const products = [
    {
      _id: "1",
      name: "Chenglong H7 (2020) 5 chân – 21,5 tấn",
      price: "100,000đ",
      avatar: {
        url:
          "https://xetaigianat.com/wp-content/uploads/2020/12/xe-ben-hino-15-t-n-xe-ben-hino-15-tan-fm-4-300x300.jpg",
      },
    },
    {
      _id: "1",
      name: "Chenglong H7 (2020) 5 chân – 21,5 tấn",
      price: "100,000đ",
      avatar: {
        url:
          "https://xetaigianat.com/wp-content/uploads/2020/10/ben6-300x300.jpg",
      },
    },
    {
      _id: "1",
      name: "Chenglong H7 (2020) 5 chân – 21,5 tấn",
      price: "100,000đ",
      avatar: {
        url:
          "https://xetaigianat.com/wp-content/uploads/2020/12/xe-ben-hino-15-t-n-xe-ben-hino-15-tan-fm-4-300x300.jpg",
      },
    },
    {
      _id: "1",
      name: "Chenglong H7 (2020) 5 chân – 21,5 tấn",
      price: "100,000đ",
      avatar: {
        url:
          "https://xetaigianat.com/wp-content/uploads/2020/10/ben6-300x300.jpg",
      },
    },
    {
      _id: "1",
      name: "Chenglong H7 (2020) 5 chân – 21,5 tấn",
      price: "100,000đ",
      avatar: {
        url:
          "https://xetaigianat.com/wp-content/uploads/2020/12/xe-ben-hino-15-t-n-xe-ben-hino-15-tan-fm-4-300x300.jpg",
      },
    },
  ];

  return (
    <>
      <h1>Products</h1>
      <Row gutter={[15, 15]}>
        {products.map((e, i) => (
          <Col xs={12} md={6} key={i}>
            <ProductCard product={e} />
          </Col>
        ))}
      </Row>
    </>
  );
}
