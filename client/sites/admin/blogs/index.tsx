import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, message, Table } from "antd";

import { BlogService } from "../../../services";
import ImageCrop from "./image-crop";
import { Layout } from "../../../components";

import "antd/dist/antd.css";

export default function Blogs({ ...props }) {
  const initQuery = { all: true, page: 1, limit: 20 };

  const [query, setQuery] = useState(initQuery);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, [query]);

  async function fetchBlogs() {
    const result = await BlogService.list(query);
    setBlogs(result.items);
  }

  const columns = [{
    key: 'id',
    title: 'id',
    dataIndex: '_id',
  },
  {
    key: 'created_at',
    title: 'created_at',
    render:(value) => {
    return <div>{value.created_at}</div>
    },
  },
  {
    key: 'updated_at',
    title: 'updated_at',
    dataIndex: 'updated_at',
  },
  {
    key: 'deleted_at',
    title: 'deleted_at',
    render:(value) => {
    return <div>
      {value.deleted_at} 
      {!value.deleted_at && <Button onClick={async ()=>{
      const result = await BlogService.remove(value._id)
      message.success(result.message)
      setQuery({...query})
    }}>remove</Button>}
      {!!value.deleted_at && <Button onClick={async ()=>{
      const result = await BlogService.update({id: value._id}, { deleted_at: null })
      message.success(result.message)
      setQuery({...query})
    }}>publist</Button>}
    </div>
    },
  }
]

  return (
    <Layout>
      <Link href={`/publish/blogs/create`}>New</Link>
      {' | '}
      <a onClick={() => {
        setQuery({...query})
      }}>Load</a>
      {' | '}
      <Link href={`/blogs`}>List</Link>
      <Table rowKey="_id" columns={columns} dataSource={blogs} pagination={false}/>
      <ImageCrop />
    </Layout>
  );
}
