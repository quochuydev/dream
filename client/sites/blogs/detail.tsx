import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tag } from "antd";

import { Layout } from "../../components";

import "antd/dist/antd.css";

export default function Post({ blog, ...props }) {
  const initData = {
    title: "",
    body: "",
    created_at: null,
    tags: [],
  };
  const [data, setData] = useState(initData);
  const router = useRouter();

  useEffect(() => {
    if (blog) {
      setData(blog);
    }
  }, [blog]);

  return (
    <Layout>
      <Link href={`/blogs`}>List</Link>
      <h1>{data.title}</h1>
      <p>{data.created_at}</p>
      {data.tags.map((tag) => (
        <Tag key={tag.value} color="cyan" style={{ marginRight: 5 }}>
          {tag.label}
        </Tag>
      ))}
      <div
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: data.body }}
      ></div>
    </Layout>
  );
}
