import React, { useEffect } from "react";
import { Spin, Tag } from "antd";

import "antd/dist/antd.css";

export default function Footer({}) {

  const tags= [{value: 1, label: 'label 1'}, {value: 2, label: 'label 2'}]

  return (
    <>
    <h1>GIỚI THIỆU</h1>
    <p>quochuydev@gmail.com</p>
      <p>Email liên hệ: quochuydev@gmail.com</p>

      <h1>TỪ KHÓA NỔI BẬT</h1>
      {tags.map(tag => <Tag key={tag.value} color="cyan" style={{ marginRight: 5 }}>
          {tag.label}
        </Tag>)}

      <h1>KẾT NỐI VỚI INVESTING</h1>
      <p>quochuydev - Việt Nam</p>

    </>
  );
}
