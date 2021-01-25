import React from "react";
import Link from "next/link";
import { Button, message } from "antd";

import { API } from "../../../client/api";

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

  function loginGoogle() {
    return fetch(`/login-google`, { method: "POST" })
      .then((res) => {
        res.text().then((body) => {
          window.location.href = body;
        });
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  return (
    <>
      <Button
        onClick={() => {
          loginGoogle();
        }}
      >
        loginGoogle
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
              <a>post: {e.title}</a>
            </Link>
            {/* <div dangerouslySetInnerHTML={{ __html: e.body }}></div> */}
          </li>
        ))}
      </ul>
    </>
  );
}
