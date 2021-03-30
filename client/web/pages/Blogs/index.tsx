import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button, message, Avatar, Card, List, Row, Col, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

import { Layout } from "../../components";
import { BlogService } from "../../../services";

import "antd/dist/antd.css";

export default function Blogs({ initBlogs: blogs, ...props }) {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <Layout>
      <Button
        onClick={() => {
          //
        }}
      >
        Apply filter
      </Button>
      <Link href={`/publish/blogs/create`}>New</Link>
      <Row gutter={8}>
        <Col span={16}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              // pageSize: 3,
            }}
            dataSource={blogs.map((e: any) => ({
              href: "https://ant.design",
              title: `${e.title}`,
              avatar: e.file_id?.url,
              description:
                "Ant Design, a design language for background applications, is refined by Ant UED Team.",
              content:
                "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
            }))}
            footer={
              <div>
                <b>ant design</b> footer part
              </div>
            }
            renderItem={(item: any) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text="156"
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
                extra={<img width={272} alt="logo" src={item.file_id?.url} />}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.file_id?.url} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Col>
        <Col span={8}>
          {blogs.map((e, i) => (
            <div key={e._id}>
              <List.Item.Meta
                avatar={
                  <Avatar shape="square" size={80} src={e.file_id?.url} />
                }
                title={
                  <Link href={`/blogs/${e._id}`}>
                    <div>
                      <a>{e.title}</a>
                      <p>{e.created_at}</p>
                      <p>{e.user_id}</p>
                    </div>
                  </Link>
                }
              />
            </div>
          ))}
        </Col>
      </Row>
    </Layout>
  );
}
