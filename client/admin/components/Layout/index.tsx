import React, { useState } from "react";
import Link from "next/link";
import { Menu, Drawer, PageHeader, Layout } from "antd";
import { signIn, signOut, useSession } from "next-auth/client";

import {
  LogoutOutlined,
  LoginOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import "../../../components/Base/node_modules/antd/dist/antd.css";
import styles from "./index.module.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import { MENU_DATA } from "../../../utils/routes";

export default function LayoutComponent(props): React.ReactElement {
  const [session, loading] = useSession();
  const [showDrawer, setShowDrawer] = useState(false);

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
        <LeftMenu />
      </Drawer>

      <PageHeader
        title={<></>}
        subTitle={<></>}
        extra={[
          <div key={2} className={styles.signedInStatus}>
            <p
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
            </p>
          </div>,
        ]}
      >
        <Layout>
          <Sider width={200} className={styles.siteLayoutBackground}>
            <LeftMenu />
          </Sider>
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
      </PageHeader>
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
  return (
    <div style={{ display: "block" }}>
      <Menu>{menuItems}</Menu>
    </div>
  );
}
