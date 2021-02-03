import React from "react";
import { RightCircleOutlined } from "@ant-design/icons";
import { PATHS } from "../common/constants";

const MENU_DATA = [
  {
    is_open: true,
    key: "blog",
    name: "Blog",
    icon: <RightCircleOutlined />,
    path: "/blogs",
  },
];

export { MENU_DATA };
