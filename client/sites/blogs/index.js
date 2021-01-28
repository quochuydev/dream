import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button, message } from "antd";

import { Layout } from "../../components";
import { BlogService } from "../../services";

import "antd/dist/antd.css";

export default function Blogs({ initBlogs, ...props }) {
  const initQuery = { page: 1, limit: 20 };
  const [query, setQuery] = useState(initQuery);
  const [blogs, setBlogs] = useState([]);

  function useDidUpdateEffect(fn, inputs) {
    const didMountRef = useRef(false);
    useEffect(() => {
      if (didMountRef.current) fn();
      else didMountRef.current = true;
    }, inputs);
  }

  useEffect(() => {
    setBlogs(initBlogs);
  }, []);

  useDidUpdateEffect(() => {
    fetchBlogs();
  }, [query]);

  async function fetchBlogs() {
    const result = await BlogService.publish.list(query);
    setBlogs(result.items);
  }

  return (
    <Layout>
      <Button
        onClick={() => {
          setQuery(initQuery);
        }}
      >
        Apply filter
      </Button>
      <Link href={`/publish/blogs/create`}>New</Link>
      <ul className="p-none">
        {blogs.map((e, i) => (
          <li key={e._id}>
            <span>{i + 1}. </span>
            <Link href={`/publish/blogs/edit/${e._id}`}>
              <a>edit</a>
            </Link>
            {" | "}
            <a
              onClick={async () => {
                await BlogService.remove(e._id);
                message.success("Delete success.");
                setQuery(initQuery);
              }}
            >
              Remove
            </a>
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
  );
}
