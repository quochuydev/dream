import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button, message, Avatar, Card, List, Row, Col } from "antd";
import { Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

import { Layout } from "../../components";
import { BlogService } from "../../services";

import "antd/dist/antd.css";

export default function Blogs({ initBlogs, ...props }) {
  const initQuery = { page: 1, limit: 20 };
  const [query, setQuery] = useState(initQuery);
  const [blogs, setBlogs] = useState([]);

  function useDidUpdateEffect(fn, inputs) {
    const didMountRef = useRef(false);
    useEffect(() => {
      if (didMountRef.current) fn();
      else didMountRef.current = true;
    }, inputs);
  }

  useEffect(() => {
    setBlogs(initBlogs);
  }, []);

  useDidUpdateEffect(() => {
    fetchBlogs();
  }, [query]);

  async function fetchBlogs() {
    const result = await BlogService.list(query);
    setBlogs(result.items);
  }
  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: "https://ant.design",
      title: `ant design part ${i}`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    });
  }

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
          setQuery(initQuery);
        }}
      >
        Apply filter
      </Button>
      <Link href={`/publish/blogs/create`}>New</Link>
      {/* <ul className="p-none">
        {blogs.map((e, i) => (
          <li key={e._id}>
            <span>{i + 1}. </span>
            <Link href={`/publish/blogs/edit/${e._id}`}>
              <a>edit</a>
            </Link>
            {" | "}
            {e.file_id && <Avatar shape="square" src={e.file_id?.url} />}
            <Link href={`/blogs/${e._id}`}>
              <a>post: {e.title}</a>
            </Link>
            {" | "}
            <span> {e.created_at}</span>
            {" | "}
            <a
              onClick={async () => {
                try {
                  await BlogService.v1.remove(e._id);
                  message.success("Delete success.");
                  setQuery(initQuery);
                } catch (error) {
                  message.error(error.message);
                }
              }}
            >
              remove
            </a>
            {" | "}
            <span>{e.user_id}</span>
          </li>
        ))}
      </ul> */}
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
            dataSource={blogs.map((e, i) => ({
              href: "https://ant.design",
              title: `${e.title}`,
              avatar: e.file_id?.url,
              description: `${e.body}`,
              content: `${e.body}`,
            }))}
            footer={
              <div>
                <b>ant design</b> footer part
              </div>
            }
            renderItem={(item) => (
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
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src={
                      item.file_id?.url
                        ? item.file_id?.url
                        : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    }
                  />
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
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
