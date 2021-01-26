import React, { useState } from "react";
import Link from "next/link";
import {
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Popover,
  message,
  List,
  Drawer,
  PageHeader,
  Tag,
  Dropdown,
  Modal,
  Upload,
  Button,
} from "antd";
import { RightCircleOutlined } from "@ant-design/icons";

import "./style.css";
import "antd/dist/antd.css";

export default function LayoutComponent({ ...props }) {
  const [isShowDrawer, setIsShowDrawer] = useState(true);

  return (
    <>
      <Drawer
        placement={"left"}
        closable={false}
        onClose={() => {
          setIsShowDrawer(false);
        }}
        visible={isShowDrawer}
        bodyStyle={{ padding: 0 }}
      >
        <LeftMenu display={true} />
      </Drawer>
      <Button
        onClick={() => {
          setIsShowDrawer(true);
        }}
      >
        Open
      </Button>
      {props.children}
    </>
  );
}

function LeftMenu() {
  const MENU_DATA = [
    {
      is_open: true,
      key: "tag",
      name: "tag",
      icon: <RightCircleOutlined />,
      path: "tag",
    },
  ];

  const menuItems = [];

  for (let i = 0; i < MENU_DATA.length; i++) {
    const menu = MENU_DATA[i];

    if (menu.is_open) {
      menuItems.push(
        <Menu.Item key={menu.key} style={{ paddingLeft: 0 }}>
          <Link href={menu.path}>
            <>
              {menu.icon}
              <span>{menu.name}</span>
            </>
          </Link>
        </Menu.Item>
      );
    }
  }

  return (
    <div style={{ display: "block" }}>
      <Menu theme="light" mode="inline">
        {menuItems}
      </Menu>
    </div>
  );
}
