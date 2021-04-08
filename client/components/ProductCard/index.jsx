import React from "react";
import { Card } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

const { Meta } = Card;

export default function ProductCard({ product }) {
  return (
    <Card
      // style={{ width: 300 }}
      cover={<img alt={product.name} src={product.avatar?.url} />}
      actions={[
        <>
          <HeartOutlined key="setting" /> Wishlist
        </>,
        <>
          <ShoppingCartOutlined key="edit" /> Add to cart
        </>,
      ]}
    >
      <Meta title={product.name} description={product.price} />
    </Card>
  );
}
