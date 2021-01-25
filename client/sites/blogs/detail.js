import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import API from "../../../client/api";

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
      API.get(`/api/blogs/${id}`).then((blog) => {
        setData({
          title: blog.title,
          body: blog.body,
          tags: blog.tags,
          created_at: blog.created_at,
        });
      });
    }
  }, []);

  return (
    <>
      <Link href={`/blogs`}>List</Link>
      <h1>{data.title}</h1>
      <h1>{data.createdAt}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.body }}></div>
    </>
  );
}
