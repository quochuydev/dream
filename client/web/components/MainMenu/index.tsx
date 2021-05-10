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
          HOME
        </Link>
      </Menu.Item>
      <SubMenu
        title={<span className="submenu-title-wrapper">HINO TẢI THÙNG</span>}
      >
        <Menu.Item key="collect:11">THÙNG BẠT</Menu.Item>
        <Menu.Item key="collect:12">THÙNG KÍN</Menu.Item>
        <Menu.Item key="collect:13">THÙNG LỬNG</Menu.Item>
        <Menu.Item key="collect:14">THÙNG BẢO ÔN</Menu.Item>
        <Menu.Item key="collect:15">THÙNG ĐÔNG LẠNH</Menu.Item>
        <Menu.Item key="collect:16">THÙNG BEN</Menu.Item>
      </SubMenu>
      <SubMenu
        title={<span className="submenu-title-wrapper">HINO CHUYÊN DỤNG</span>}
      >
        <Menu.Item key="collect:21">HINO GẮN CẨU</Menu.Item>
        <Menu.Item key="collect:22">HINO CHỞ GIA CẦM</Menu.Item>
        <Menu.Item key="collect:23">HINO CHỞ GIA SÚC</Menu.Item>
        <Menu.Item key="collect:24">HINO BỒN XĂNG DẦU</Menu.Item>
        <Menu.Item key="collect:25">HINO CHỞ XE</Menu.Item>
        <Menu.Item key="collect:26">HINO ÉP RÁC</Menu.Item>
        <Menu.Item key="collect:27">HINO CHỞ CÁM</Menu.Item>
        <Menu.Item key="collect:28">HINO XITEC</Menu.Item>
      </SubMenu>

      <Menu.Item key="blogs">
        <Link href="/blogs">BLOGS</Link>
      </Menu.Item>
    </Menu>
  );
}
