import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import _ from "lodash";
import { Form, message, Input, Button } from "antd";
import { EyeOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import UploadAdapter from "../../../utils/upload-adapter";
import { BACKEND_URL, getToken } from "../../../api";
import { BlogService } from "../../../services";
import { Layout } from "../../../components";
import TagSelect from "./TagSelect";
import Thumbnail from "./Thumbnail";

import "antd/dist/antd.css";

export default function Blog({}) {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const [data, setData] = useState({ title: "", body: "" });
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (id) {
      getBlog(id);
    }
  }, []);

  async function getBlog(id) {
    const result = await BlogService.detail(id);
    if (result) {
      setData({ title: result.title, body: result.body || "" });
      setTags(result.tags);
    }
  }

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const onFinish = async (value) => {
    try {
      if (id) {
        await BlogService.update(
          { id },
          {
            title: value.title,
            body: value.body,
            tags,
          }
        );
        message.success("Update blog");
      } else {
        const result = await BlogService.create({
          title: value.title,
          body: value.body,
          tags,
        });
        message.success("Create blog");
        Router.push(`/publish/blogs/edit/${result._id}`);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Layout>
      <Button onClick={() => Router.back()}>
        <LeftCircleOutlined />
      </Button>
      <br />
      <Link href={`/blogs`}>List</Link>
      <br />
      {id && (
        <Link href={`/blogs/${id}`}>
          <EyeOutlined />
        </Link>
      )}
      <Form form={form} onFinish={onFinish}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Form.Item name="title" label="Title">
          <Input placeholder="Basic usage" />
        </Form.Item>

        <TagSelect selected={tags} setSelected={setTags} />

        <Form.Item
          name="body"
          valuePropName="data"
          getValueFromEvent={(event, editor) => {
            const data = editor.getData();
            return data;
          }}
        >
          <CKEditor
            editor={ClassicEditor}
            onReady={(editor) => {
              editor.plugins.get(
                "FileRepository"
              ).createUploadAdapter = function (loader) {
                return new UploadAdapter(loader);
              };
            }}
            config={{
              ckfinder: {
                uploadUrl: `${BACKEND_URL}/api/files`,
                headers: {
                  Authorization: "Bearer accessToken",
                },
              },
            }}
          />
        </Form.Item>
      </Form>
      <Thumbnail className="hide" />
    </Layout>
  );
}
