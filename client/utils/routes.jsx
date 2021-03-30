import React from "react";
import { RightCircleOutlined } from "@ant-design/icons";
import { PATHS } from "../common/constants";

const MENU_DATA = [
  {
    is_open: true,
    key: "home",
    name: "Home",
    icon: <RightCircleOutlined />,
    path: "/",
  },
  {
    is_open: true,
    key: "blog",
    name: "Blog",
    icon: <RightCircleOutlined />,
    path: "/admin/blogs",
  },
  {
    is_open: true,
    key: "user",
    name: "User",
    icon: <RightCircleOutlined />,
    path: "/admin/users",
  },
];

export { MENU_DATA };
