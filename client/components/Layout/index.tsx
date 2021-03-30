import React, { useState } from "react";
import Link from "next/link";
import { Menu, Drawer, PageHeader, Carousel } from "antd";
import { signIn, signOut, useSession } from "next-auth/client";

import {
  LogoutOutlined,
  LoginOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import "antd/dist/antd.css";

import MainMenu from "../MainMenu";
import Footer from "../Footer";
import Banner from "../Banner";
import { MENU_DATA } from "../../utils/routes";

import styles from "./index.module.css";
import Avatar from "antd/lib/avatar/avatar";

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
        title={
          <Avatar
            shape="square"
            size="large"
            src={
              "http://xetaigianat.com/wp-content/uploads/2020/09/116722459_122745202850084_1095321087195858261_n.png"
            }
          />
        }
        subTitle={<MainMenu />}
        extra={[
          <SearchOutlined key={0} />,
          // <ShoppingCartOutlined key={1} />,
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
        <Banner />
        <div>{props.children}</div>
      </PageHeader>
      {!props.hideFooter && <Footer />}
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
