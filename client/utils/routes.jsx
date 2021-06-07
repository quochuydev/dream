import React from "react";
import { RightCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { PATHS } from "../common/constants";

const MENU_DATA = [
  {
    is_open: true,
    key: "blog",
    name: "Blog",
    icon: <RightCircleOutlined />,
    path: "/blogs",
  },
  {
    is_open: true,
    key: "user",
    name: "User",
    icon: <HomeOutlined />,
    path: "/users",
  },
];

export { MENU_DATA };
