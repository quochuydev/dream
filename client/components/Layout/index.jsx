import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { Menu, message, Drawer, PageHeader, Button } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";

import "./style.css";
import "antd/dist/antd.css";
import { APIClient } from "../../../client/api";
import { MENU_DATA } from "../../utils/routes";

export default function LayoutComponent({ ...props }) {
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
            <span
              className="cursor-pointer"
              onClick={() => {
                Router.push("/");
              }}
            >
              {" Home"}
            </span>
          </>
        }
        extra={[
          <div style={{ display: "block" }} key={0}>
            {localStorage.getItem("me") ? (
              <>
                <p style={{ fontSize: 14 }}>
                  {localStorage.getItem("me")}
                  <a
                    style={{
                      marginLeft: 5,
                      // display: "block",
                      // position: "fixed",
                      // bottom: 0,
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
        {props.children}
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
      {localStorage.getItem("me") ? (
        <p>{localStorage.getItem("me")}</p>
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
      {localStorage.getItem("me") && (
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
