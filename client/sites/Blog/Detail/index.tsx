import React from "react";
import Link from "next/link";
import { Tag, Avatar } from "antd";

import { Layout } from "../../../../components";

import "antd/dist/antd.css";

export default function Blog({ blog }) {
  return (
    <Layout>
      {/* {blog.file_id && (
        <Avatar shape="square" src={blog.file_id?.url} size={200} />
      )} */}
      <h1>{blog.title}</h1>
      <p>{blog.created_at}</p>
      {blog.tags.map((tag) => (
        <Tag key={tag.value} color="cyan" style={{ marginRight: 5 }}>
          {tag.label}
        </Tag>
      ))}
      <div
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: blog.body }}
      ></div>
    </Layout>
  );
}
