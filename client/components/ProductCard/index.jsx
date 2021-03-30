import React from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import "../Base/node_modules/antd/dist/antd.css";

const { Meta } = Card;

export default function ProductCard({ ...props }) {
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
