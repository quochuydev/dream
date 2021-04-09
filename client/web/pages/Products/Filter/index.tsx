import React from "react";
import { Card, Slider, Tag, List, Avatar } from "antd";

import "antd/dist/antd.css";

export default function Index() {
  const tags = [
    {
      value: "4",
      label: "T-Shirt",
    },
    {
      value: "4",
      label: "T-Shirt",
    },
    {
      value: "4",
      label: "T-Shirt",
    },
    {
      value: "4",
      label: "T-Shirt",
    },
    {
      value: "4",
      label: "T-Shirt",
    },
    {
      value: "4",
      label: "T-Shirt",
    },
  ];

  const data = [
    {
      title: "Chenglong H7 (2020) 5 chân – 21,5 tấn – Thùng mui bạt",
      price: "1,600,000,000₫",
    },
    {
      title:
        "Hino 15 tấn (2 cầu thật) | Hino FM8JW7A - Gắn cẩu SOOSAN SCS746L 8 tấn",
      price: "1,770,000,000₫",
    },
  ];

  function onChange(value) {
    console.log("onChange: ", value);
  }

  function onAfterChange(value) {
    console.log("onAfterChange: ", value);
  }

  return (
    <>
      <Card size="small" title={<h1>Viewed</h1>}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    shape="square"
                    size={60}
                    src="https://xetaigianat.com/wp-content/uploads/2020/08/web-5-ch%C3%A2n-1-100x100.png"
                  />
                }
                title={<a href="https://xetaigianat.com">{item.title}</a>}
                description={item.price}
              />
            </List.Item>
          )}
        />
      </Card>
      <Card size="small" title={<h1>Filter</h1>}>
        <h3>Price</h3>
        <Slider
          range
          step={10}
          defaultValue={[20, 50]}
          onChange={onChange}
          onAfterChange={onAfterChange}
        />
        <h3>Tags</h3>
        {tags.map((tag, i) => (
          <Tag key={i} color="cyan" style={{ marginRight: 5 }}>
            {tag.label}
          </Tag>
        ))}
      </Card>
    </>
  );
}
