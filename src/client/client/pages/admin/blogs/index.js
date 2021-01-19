import React from "react";
import Link from "next/link";
import { Button, message } from "antd";

import API from "../../../api";

import "antd/dist/antd.css";

export default function Posts({}) {
  const initQuery = { page: 1, limit: 20 };

  const [query, setQuery] = React.useState(initQuery);
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    fetchBlogs();
  }, [query]);

  async function fetchBlogs() {
    const result = await API.get("/api/blogs");
    setBlogs(result.blogs);
  }

  return (
    <>
      <Link href={`/blogs/create`}>New</Link>
      <ul>
        {blogs.map((e) => (
          <li key={e._id}>
            <Button
              onClick={() => {
                API.delete(`/api/blogs/${e._id}`).then((res) => {
                  setQuery(initQuery);
                  message.success("Delete success.");
                });
              }}
            >
              Remove
            </Button>
            <Link href={`/blogs/edit/${e._id}`}>
              <a>post: {e.title}</a>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: e.body }}></div>
          </li>
        ))}
      </ul>
    </>
  );
}
