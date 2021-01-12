import React from "react";

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
      <ul>
        {blogs.map((e) => (
          <li key={e._id}>{e.title}</li>
        ))}
      </ul>
    </>
  );
}
