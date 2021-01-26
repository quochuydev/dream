import React from "react";
import { RightCircleOutlined } from "@ant-design/icons";
import { PATHS } from "../common/constants";

const { LOGIN_ROUTE } = PATHS;

const MENU_DATA = [
  {
    key: "setting",
    title: "Setting",
    icon: <RightCircleOutlined />,
    path: "/admin/settings",
    // subs: [
    //   {
    //     key: 'tag',
    //     title: 'Tag',
    //     path: TAG_ROUTE,
    //     icon: <People />,
    //     is_open: true,
    //   },
    // ],
    is_open: true,
  },
];

export { ROUTE_LIST, MENU_DATA };
