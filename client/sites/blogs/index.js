import React from "react";
import Link from "next/link";
import { Button, message } from "antd";
import Router from "next/router";

import { API, BACKEND_URL } from "../../../client/api";
import { Layout } from "../../components";
import SearchSelect from "../../components/SearchSelect";

import "antd/dist/antd.css";

export default function Posts({}) {
  const initQuery = { page: 1, limit: 20 };

  const [query, setQuery] = React.useState(initQuery);
  const [blogs, setBlogs] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
    fetchBlogs();
  }, [query]);

  async function fetchBlogs() {
    const result = await API.get("/api/blogs", query);
    setBlogs(result.blogs);
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
          Apply
        </Button>
        <Button
          onClick={() => {
            setQuery({ ...initQuery, limit: 10 });
          }}
        >
          Apply 10
        </Button>
        <Link href={`/publish/blogs/create`}>New</Link>
        <SearchSelect
          id={"tags"}
          limit={query.limit}
          page={query.page}
          selected={selected}
          total={total}
          values={blogs}
          handleValue={setSelected}
          search={(value) => {
            setQuery({ ...query, ...value });
          }}
        />
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
