import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
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
          title: blog.body,
          title: blog.tags,
          title: blog.created_at,
        });
      });
    }
  }, []);

  return (
    <>
      <Link href={`/blogs`}>List</Link>
      <p>{data.created_at}</p>
      <p>{data.title}</p>
      <p>{data.tags}</p>
      <div dangerouslySetInnerHTML={{ __html: data.body }} />
    </>
  );
}
