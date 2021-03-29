import React from "react";
import { Card, Row, Col, Slider, Tag } from "antd";

import "antd/dist/antd.css";

export default function Index({ ...props }) {
  const tags = [
    {
      value: "4",
      label: "T-Shirt",
    },
  ];

  function onChange(value) {
    console.log("onChange: ", value);
  }

  function onAfterChange(value) {
    console.log("onAfterChange: ", value);
  }

  return (
    <Card>
      <p>Price</p>
      <Slider
        range
        step={10}
        defaultValue={[20, 50]}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
      <p>Tags</p>
      {tags.map((tag) => (
        <Tag key={tag.value} color="cyan" style={{ marginRight: 5 }}>
          {tag.label}
        </Tag>
      ))}
    </Card>
  );
}
