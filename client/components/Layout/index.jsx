import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { Menu, message, Drawer, PageHeader, Button, Carousel } from "antd";
import { signIn, signOut, useSession } from "next-auth/client";

import {
  SearchOutlined,
  MenuOutlined,
  CaretRightOutlined,
  HomeOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import "antd/dist/antd.css";

import MainMenu from "../MainMenu";
import Footer from "../Footer";

import { APIClient } from "../../../client/api";
import { MENU_DATA } from "../../utils/routes";
import styles from "./layout.module.css";

const { SubMenu } = Menu;

function getMe() {
  return localStorage.getItem("me");
}

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export default function LayoutComponent({ hideFooter, ...props }) {
  const [session, loading] = useSession();
  const [showDrawer, setShowDrawer] = useState(false);
  const [current, setCurrent] = useState(false);

  function handleClick(e) {
    setCurrent(e.key);
  }

  const subTitle = (
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
      <Menu.Item key="about-us">
        <Link href="/client">About us</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Drawer
        placement={"left"}
        closable={false}
        onClose={() => {
          setShowDrawer(false);
        }}
        visible={showDrawer}
        bodyStyle={{ padding: 0 }}
      >
        <LeftMenu display={true} />
      </Drawer>

      <PageHeader
        title={
          <MenuOutlined
            onClick={() => {
              setShowDrawer(true);
            }}
          />
        }
        subTitle={subTitle}
        extra={[
          <div key={0} className={styles.signedInStatus}>
            <p
              className={`nojs-show ${
                !session && loading ? styles.loading : styles.loaded
              }`}
            >
              {!session && (
                <>
                  <span className={styles.notSignedInText}>
                    You are not signed in
                  </span>
                  <a
                    href={`/api/auth/signin`}
                    className={styles.buttonPrimary}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn();
                    }}
                  >
                    <LoginOutlined /> Login
                  </a>
                </>
              )}
              {session && (
                <>
                  {session.user.image && (
                    <span
                      style={{ backgroundImage: `url(${session.user.image})` }}
                      className={styles.avatar}
                    />
                  )}
                  <span className={styles.signedInText}>
                    <small>Signed in as</small>
                    <br />
                    <strong>{session.user.email || session.user.name}</strong>
                  </span>
                  <a
                    href={`/api/auth/signout`}
                    className={styles.button}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    <LogoutOutlined /> Logout
                  </a>
                </>
              )}
            </p>
          </div>,
          // <SearchOutlined key={1} className="hide" />,
        ]}
      >
        <MainMenu />
        <div>{props.children}</div>
      </PageHeader>
      {!hideFooter && <Footer />}
    </>
  );
}

function LeftMenu() {
  const menuItems = [];

  for (let i = 0; i < MENU_DATA.length; i++) {
    const menu = MENU_DATA[i];

    if (menu.is_open) {
      menuItems.push(
        <Menu.Item key={menu.key} style={{ paddingLeft: 0 }}>
          <Link href={menu.path}>
            <div>
              {menu.icon}
              <span>{menu.name}</span>
            </div>
          </Link>
        </Menu.Item>
      );
    }
  }
  return <div style={{ display: "block" }}></div>;
}
