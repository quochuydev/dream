import React from "react";
import Link from "next/link";
import { Button, message } from "antd";

import { BlogService } from "../../../services";

import "antd/dist/antd.css";

export default function Blogs({}) {
  const initQuery = { page: 1, limit: 20 };

  const [query, setQuery] = React.useState(initQuery);
  const [blogs, setBlogs] = React.useState([]);
  const blogService = BlogService();

  React.useEffect(() => {
    fetchBlogs();
  }, [query]);

  async function fetchBlogs() {
    const result = await blogService.list(query);
    setBlogs(result.blogs);
  }

  return (
    <>
      <Link href={`/blogs/create`}>New</Link>
      <ul>
        {blogs.map((e) => (
          <li key={e._id}>
            <Button
              onClick={async () => {
                await blogService.remove(e._id);
                setQuery(initQuery);
                message.success("Delete success.");
              }}
            >
              Remove
            </Button>
            <Link href={`/publish/blogs/edit/${e._id}`}>
              <a>post: {e.title}</a>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: e.body }}></div>
          </li>
        ))}
      </ul>
    </>
  );
}
