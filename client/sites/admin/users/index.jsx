import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, message, Table } from "antd";

import { UserService } from "../../../services";
import { Layout, AdminLayout } from "../../../components";

import "antd/dist/antd.css";

export default function AdminUsers() {
  const userService = UserService();
  const initQuery = { all: true, page: 1, limit: 20 };

  const [query, setQuery] = useState(initQuery);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [query]);

  async function fetchUsers() {
    const result = await userService.list(query);
    setUsers(result.users);
  }

  const columns = [
    {
      key: "id",
      title: "id",
      dataIndex: "_id",
    },
    {
      key: "firstName",
      title: "firstName",
      render: (value) => {
        return <div>{value.firstName}</div>;
      },
    },
    {
      key: "email",
      title: "email",
      render: (value) => {
        return <div>{value.email}</div>;
      },
    },
    {
      key: "roles",
      title: "roles",
      dataIndex: "roles",
    },
    {
      key: "createdAt",
      title: "createdAt",
      render: (value) => {
        return <div>{value.createdAt}</div>;
      },
    },
    {
      key: "updated_at",
      title: "updated_at",
      dataIndex: "updated_at",
    },
    {
      key: "deleted_at",
      title: "deleted_at",
      render: (value) => {
        return (
          <div>
            {value.deleted_at}
            {!value.deleted_at && (
              <Button
                onClick={async () => {
                  const result = await userService.remove(value._id);
                  message.success(result.message);
                  setQuery({ ...query });
                }}
              >
                remove
              </Button>
            )}
            {!!value.deleted_at && (
              <Button
                onClick={async () => {
                  const result = await userService.update(
                    { id: value._id },
                    { deleted_at: null }
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
    <AdminLayout>
      <Link href={`/publish/users/create`}>New</Link>
      {" | "}
      <a
        onClick={() => {
          setQuery({ ...query });
        }}
      >
        Load
      </a>
      {" | "}
      <Link href={`/users`}>List</Link>
      <Table
        scroll={{ x: true }}
        rowKey="_id"
        columns={columns}
        dataSource={users}
        pagination={false}
      />
    </AdminLayout>
  );
}
