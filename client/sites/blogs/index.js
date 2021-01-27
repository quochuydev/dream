import React from "react";
import Link from "next/link";
import { Button, message } from "antd";

import { Layout } from "../../components";
import { BlogService } from "../../services";

import "antd/dist/antd.css";

export default function Blogs({}) {
  const initQuery = { page: 1, limit: 20 };

  const [query, setQuery] = React.useState(initQuery);
  const [blogs, setBlogs] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    fetchBlogs();
  }, [query]);

  async function fetchBlogs() {
    const result = await BlogService.publish.list(query);
    setBlogs(result.items);
    setTotal(result.total);
  }

  return (
    <>
      <Layout>
        <Button
          onClick={() => {
            setQuery(initQuery);
          }}
        >
          Apply filter
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
