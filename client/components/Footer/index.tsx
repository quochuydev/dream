import React, { useEffect } from "react";
import { Spin, Tag, Row, Col } from "antd";

import "antd/dist/antd.css";

export default function Footer({}) {

  const tags= [{value: 1, label: 'label 1'}, {value: 2, label: 'label 2'}]

  return (
    <>
    <Row>
    <Col span={8}>
    <h3>GIỚI THIỆU</h3>
    <p>quochuydev@gmail.com</p>
      <p>Email liên hệ: quochuydev@gmail.com</p>
    </Col>
    <Col span={8}>
    <h3>TỪ KHÓA NỔI BẬT</h3>
      {tags.map(tag => <Tag key={tag.value} color="cyan" style={{ marginRight: 5 }}>
          {tag.label}
        </Tag>)}
    </Col>
    <Col span={8}>
    <h3>KẾT NỐI VỚI INVESTING</h3>
      <p>quochuydev - Việt Nam</p>
    </Col>
  </Row>



    </>
  );
}
