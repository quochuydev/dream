import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button, message, Avatar,Card,List } from "antd";

import { Layout } from "../../components";
import { BlogService } from "../../services";

import "antd/dist/antd.css";
import "./style.css";

const {Meta } =Card

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
            {e.file_id && <Avatar shape="square" src={e.file_id?.url} />}
            <Link href={`/blogs/${e._id}`}>
              <a>post: {e.title}</a>
            </Link>
            {" | "}
            <span> {e.created_at}</span>
            {" | "}
            <a
              onClick={async () => {
                try {
                  await BlogService.remove(e._id);
                  message.success("Delete success.");
                  setQuery(initQuery);
                } catch (error) {
                  message.error(error.message);
                }
              }}
            >
              remove
            </a>
            {" | "}
            <span>{e.user_id}</span>
          </li>
        ))}
      </ul>
      <List.Item.Meta
          avatar={<Avatar shape="square" size={200} src={'https://investing.vn/home/wp-content/uploads/2021/02/facebook-500x300.png'} />}
          title={"Liên tục bắt chước đối thủ, Facebook đang trở thành cỗ máy ”copy” 770 tỷ USD?"}
          description="Theo CNN, vài năm gần đây, Facebook xuất hiện trên truyền thông nhiều với việc sao chép lại tính năng nổi…"
        />
    </Layout>
  );
}
