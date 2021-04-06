import React, { useEffect } from "react";
import { Tag, Row, Col, List, Avatar } from "antd";
import Link from "next/link";

import "antd/dist/antd.css";
import styles from "./footer.module.css";

export default function Footer(): React.ReactElement {
  const tags = [
    { _id: 1, label: "label 1" },
    { _id: 2, label: "label 2" },
  ];

  return (
    <footer className={styles.footer}>
      <Row gutter={30}>
        <Col span={8}>
          <h3>CÔNG TY CỔ PHẦN Ô TÔ VĨNH THỊNH</h3>
          <p>
            Trụ sở chính : 55/5 Khu phố Bình Giao - P.Thuận Giao, TP.Thuận An -
            Tỉnh Bình Dương
          </p>
          <p>Hotline: 0382.986.838</p>
          <p>Email liên hệ: quochuydev@gmail.com</p>
        </Col>
        <Col span={8}>
          <h3>Tin tức</h3>
          <div>
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  size={50}
                  src={
                    "http://localhost:8000/api/files/2679061cc40fc7bb759100542444109159.png"
                  }
                />
              }
              title={
                <Link href={`/blogs`}>
                  <div>
                    <a>{"BÀN GIAO CHASSIS FL8JT7A – ĐÓNG BỒN 20 KHỐI"}</a>
                    <p>{"2021-01-28T09:04:39.532Z"}</p>
                  </div>
                </Link>
              }
            />
          </div>
        </Col>
        <Col span={8}>
          <h3>TỪ KHÓA NỔI BẬT</h3>
          {tags.map((tag) => (
            <Tag key={tag._id} color="cyan" style={{ marginRight: 5 }}>
              <Link href={`/tags/${tag._id}`}>{tag.label}</Link>
            </Tag>
          ))}
        </Col>
      </Row>
    </footer>
  );
}
