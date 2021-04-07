import React, { useState } from "react";
import Link from "next/link";
import { Menu, Drawer, PageHeader, Layout, Breadcrumb } from "antd";
import { signIn, signOut, useSession } from "next-auth/client";

import {
  LogoutOutlined,
  LoginOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import "antd/dist/antd.css";
import styles from "./index.module.css";

import { MENU_DATA } from "../../../utils/routes";

export default function LayoutComponent(props): React.ReactElement {
  const [session, loading] = useSession();
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Layout>
      <Drawer
        placement={"left"}
        closable={false}
        onClose={() => {
          setShowDrawer(false);
        }}
        visible={showDrawer}
        bodyStyle={{ padding: 0 }}
      >
        <LeftMenu />
      </Drawer>
      <PageHeader
        className={styles.header}
        title={<></>}
        subTitle={<></>}
        extra={[
          <div key={2} className={styles.signedInStatus}>
            <div
              className={`nojs-show ${
                !session && loading ? styles.loading : styles.loaded
              }`}
            >
              {!session && (
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
              )}
              {session && (
                <div>
                  {session.user.image && (
                    <span
                      style={{
                        backgroundImage: `url(${session.user.image})`,
                      }}
                      className={styles.avatar}
                    />
                  )}
                  <span className={styles.signedInText}>
                    <strong>{session.user.email || session.user.name}</strong>
                  </span>
                  <br />
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
                </div>
              )}
            </div>
          </div>,
        ]}
      />
      <Layout>
        <Sider width={200} className="site-layout-background">
          <LeftMenu />
        </Sider>
        <Layout style={{ padding: "0 16px 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className={styles.siteLayoutBackground}
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div>{props.children}</div>
          </Content>
        </Layout>
      </Layout>
      {/* 
      <Sider width={200} className={styles.siteLayoutBackground}>
        <LeftMenu />
      </Sider> */}
    </Layout>
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
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%", borderRight: 0 }}
    >
      {menuItems}
    </Menu>
  );
}
