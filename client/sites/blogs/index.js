import React from "react";
import Link from "next/link";
import { Button, message } from "antd";
import Router from "next/router";

import { API, BACKEND_URL } from "../../../client/api";
import { Layout } from "../../components";

import "antd/dist/antd.css";

export default function Posts({}) {
  const initQuery = { page: 1, limit: 20 };

  const [query, setQuery] = React.useState(initQuery);
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    fetchBlogs();
  }, [query]);

  async function fetchBlogs() {
    const result = await API.get("/api/blogs", query);
    setBlogs(result.blogs);
  }

  return (
    <>
      <Layout>
        <Button
          onClick={() => {
            fetchBlogs();
          }}
        >
          Apply
        </Button>
        <Link href={`/publish/blogs/create`}>New</Link>
        <ul>
          {blogs.map((e) => (
            <li key={e._id}>
              <Link href={`/publish/blogs/edit/${e._id}`}>
                <a>edit</a>
              </Link>
              {" | "}
              <Link href={`/blogs/${e._id}`}>
                <a>
                  post: {e.title} {e.created_at}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
}
