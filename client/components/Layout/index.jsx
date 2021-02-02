import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { Menu, message, Drawer, PageHeader, Button } from "antd";
import {
  SearchOutlined,
  MenuOutlined,
  CaretRightOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import "./style.css";
import "antd/dist/antd.css";

import MainMenu from "../MainMenu";
import { APIClient } from "../../../client/api";
import { MENU_DATA } from "../../utils/routes";

function getMe() {
  return localStorage.getItem("me");
}

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export default function LayoutComponent({ ...props }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const subTitle = (
    <>
      <Link href={"/"}>
        <HomeOutlined />
      </Link>
      {props.headers &&
        props.headers.map((e, i) => (
          <div key={i} style={{ display: "contents" }}>
            <CaretRightOutlined /> <Link href={e.path || "#"}>{e.name}</Link>
          </div>
        ))}
    </>
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
        style={{ padding: 5 }}
        title={
          <>
            <MenuOutlined
              onClick={() => {
                setShowDrawer(true);
              }}
            />
          </>
        }
        subTitle={subTitle}
        extra={[
          <div style={{ display: "block" }} key={0}>
            {getMe() && !isMobile() ? (
              <>
                <p style={{ fontSize: 14 }}>
                  {getMe()}
                  <a
                    style={{
                      marginLeft: 5,
                    }}
                    onClick={() => {
                      localStorage.clear();
                      Router.push("/");
                    }}
                  >
                    logout
                  </a>
                </p>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    loginGoogle();
                  }}
                >
                  login
                </Button>
              </>
            )}
          </div>,
          <SearchOutlined key={1} className="hide" />,
        ]}
      >
        <MainMenu />
        <div>{props.children}</div>
      </PageHeader>
    </>
  );
}

async function loginGoogle() {
  try {
    const result = await APIClient.post("/login-google");
    window.location.href = result;
  } catch (error) {
    message.error(error.message);
  }
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
      {getMe() ? (
        <p>{getMe()}</p>
      ) : (
        <>
          <Button
            onClick={() => {
              loginGoogle();
            }}
          >
            login
          </Button>
        </>
      )}
      <Menu theme="light" mode="inline">
        {menuItems}
      </Menu>
      {getMe() && (
        <a
          style={{
            display: "block",
            position: "fixed",
            bottom: 0,
          }}
          onClick={() => {
            localStorage.clear();
            Router.push("/");
          }}
        >
          logout
        </a>
      )}
    </div>
  );
}
