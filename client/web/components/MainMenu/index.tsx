import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "antd";

import "antd/dist/antd.css";

const { SubMenu } = Menu;

export default function MainMenu({ ...props }) {
  const [current, setCurrent] = useState<any>(false);

  function handleClick(e) {
    setCurrent(e.key);
  }

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      inlineIndent={0}
      // className={styles.menu}
    >
      <Menu.Item key="home">
        <Link href={"/"}>
          {/* <HomeOutlined /> */}
          Home
        </Link>
      </Menu.Item>
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            {/* <HomeOutlined /> */}
            Products
          </span>
        }
      >
        <Menu.Item key="setting:1">T-Shirst</Menu.Item>
        <Menu.Item key="setting:2">Jean</Menu.Item>
      </SubMenu>
      <Menu.Item key="blogs">
        <Link href="/blogs">Blogs</Link>
      </Menu.Item>
    </Menu>
  );
}
