import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { BlogService } from "../../services";
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
  const { id } = router.query;

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
      {data.tags.map((e) => (
        <p key={e.value}>{e.label}</p>
      ))}
      <div
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: data.body }}
      ></div>
    </Layout>
  );
}
