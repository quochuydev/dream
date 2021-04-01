import React from "react";
import { Card } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

const { Meta } = Card;

export default function ProductCard() {
  return (
    <Card
      // style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://xetaigianat.com/wp-content/uploads/2020/10/0392VAQ09011900S-300x256.jpg"
        />
      }
      actions={[
        <>
          <HeartOutlined key="setting" /> Wishlist
        </>,
        <>
          <ShoppingCartOutlined key="edit" /> Add to cart
        </>,
      ]}
    >
      <Meta title="Card title" description="100,000đ" />
    </Card>
  );
}
