import React, { useState } from "react";
import Link from "next/link";
import { Menu, Drawer, PageHeader, Carousel } from "antd";
import { signIn, signOut, useSession } from "next-auth/client";

import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

import MainMenu from "../MainMenu";
import Footer from "../Footer";
import { MENU_DATA } from "../../utils/routes";
import styles from "./layout.module.css";
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
              "https://bidbid-dev.s3.ap-southeast-1.amazonaws.com/0309f3f6308f-function-date%28a0-a1-a2-a3-a4-a5-a6%29-native-code-.jpg"
            }
          />
        }
        subTitle={<MainMenu />}
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
                </>
              )}
            </p>
          </div>,
          // <SearchOutlined key={1} className="hide" />,
        ]}
      >
        <Carousel autoplay>
          <div>
            <h3 className={styles.contentStyle}>
              <img
                src={
                  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2697a7115583477.60513de14d3c8.jpg"
                }
              />
            </h3>
          </div>
          <div>
            <h3 className={styles.contentStyle}>
              <img
                src={
                  "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/88357382_218508332863044_5569936219082588160_o.png?_nc_cat=103&ccb=1-3&_nc_sid=e3f864&_nc_ohc=Eg_Sz7QspkYAX84A0KY&_nc_ht=scontent.fsgn1-1.fna&_nc_tp=30&oh=0cfffebffbd87f3a63efeb810ea26fac&oe=6084CB87"
                }
              />
            </h3>
          </div>
        </Carousel>
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
