import React from "react";
import Link from "next/link";
import { Input, Button, Modal, Upload } from "antd";

import API from "../../../client/api";

import "antd/dist/antd.css";

export default function Posts({}) {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    fetchBlogs();
  }, []);

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
                console.log(e._id);
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
