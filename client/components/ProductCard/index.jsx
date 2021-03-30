import React from "react";
import { Card, Avatar } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

const { Meta } = Card;

export default function ProductCard() {
  return (
    <Card
      // style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <>
          <SettingOutlined key="setting" /> Wishlist
        </>,
        <>
          <EditOutlined key="edit" /> Add to cart
        </>,
      ]}
    >
      <Meta title="Card title" description="This is the description" />
    </Card>
  );
}
