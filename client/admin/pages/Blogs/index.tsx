import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, message, Table } from "antd";

import { BlogService } from "../../../services";
import ImageCrop from "../../../components/ImageCrop";
import Layout from "../../components/Layout";

import "antd/dist/antd.css";

export default function AdminBlog() {
  const initQuery = { all: true, page: 1, limit: 20 };

  const [query, setQuery] = useState(initQuery);
  const [blogs, setBlogs] = useState([]);

  const blogService = BlogService();

  useEffect(() => {
    fetchBlogs();
  }, [query]);

  async function fetchBlogs() {
    const result = await blogService.list(query);
    setBlogs(result.items);
  }

  const columns = [
    {
      key: "id",
      title: "id",
      render: (value) => {
        return <Link href={`/admin/blogs/edit/${value._id}`}>{value._id}</Link>;
      },
    },
    {
      key: "title",
      title: "title",
      render: (value) => {
        return (
          <Link href={`/admin/blogs/edit/${value._id}`}>
            <p>{value.title}</p>
          </Link>
        );
      },
    },
    {
      key: "createdAt",
      title: "createdAt",
      render: (value) => {
        return <div>{value.createdAt}</div>;
      },
    },
    {
      key: "updatedAt",
      title: "updatedAt",
      dataIndex: "updatedAt",
    },
    {
      key: "deletedAt",
      title: "deletedAt",
      render: (value) => {
        return (
          <div>
            {value.deletedAt}
            {!value.deletedAt && (
              <Button
                onClick={async () => {
                  const result = await blogService.remove(value._id);
                  message.success(result.message);
                  setQuery({ ...query });
                }}
              >
                remove
              </Button>
            )}
            {!!value.deletedAt && (
              <Button
                onClick={async () => {
                  const result = await blogService.update(
                    { id: value._id },
                    { deletedAt: null }
                  );
                  message.success(result.message);
                  setQuery({ ...query });
                }}
              >
                publist
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Layout>
      <Link href={`/admin/blogs/create`}>New</Link>
      {" | "}
      <a
        onClick={() => {
          setQuery({ ...query });
        }}
      >
        Load
      </a>
      {" | "}
      <Link href={`/blogs`}>List</Link>
      <Table
        scroll={{ x: true }}
        rowKey="_id"
        columns={columns}
        dataSource={blogs}
        pagination={false}
      />
      <ImageCrop />
    </Layout>
  );
}
