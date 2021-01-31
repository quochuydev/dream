import React from "react";
import Link from "next/link";
import { Tag } from "antd";

import { Layout } from "../../components";

import "antd/dist/antd.css";

export default function Post({ blog }) {
  return (
    <Layout>
      <Link href={`/blogs`}>List</Link>
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
