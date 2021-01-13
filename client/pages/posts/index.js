import React from "react";
import Link from "next/link";

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
            <Link href={`/blogs/edit/${e._id}`}>{e.title}</Link>
            <p>{e.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
