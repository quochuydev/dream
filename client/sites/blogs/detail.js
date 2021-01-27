import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { API } from "../../../client/api";
import { BlogService } from "../../services";
import { Layout } from "../../components";

import "antd/dist/antd.css";

export default function Post({}) {
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
    if (id) {
      getBlog(id);
    }
  }, []);

  async function getBlog(id) {
    const blog = await BlogService.publish.detail(id);
    setData({
      title: blog.title,
      body: blog.body,
      tags: blog.tags,
      created_at: blog.created_at,
    });
  }

  return (
    <Layout>
      <Link href={`/blogs`}>List</Link>
      <h1>{data.title}</h1>
      <p>{data.created_at}</p>
      <div
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: data.body }}
      ></div>
    </Layout>
  );
}
