import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import { Input, Button, Modal, Upload } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form, message } from "antd";

import API from "../../../client/api";

import "antd/dist/antd.css";

export default function Post({}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState({ title: "", body: "" });
  const router = useRouter();
  const { id } = router.query;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      API.get(`/api/blogs/${id}`).then((blog) => {
        setData({ title: blog.title, body: blog.body || "" });
      });
    }
  }, []);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const onFinish = async (value) => {
    if (id) {
      API.put(`/api/blogs/${id}`, {
        title: value.title,
        body: value.body,
      }).then(() => {
        message.success("updateEmailConfig");
      });
    } else {
      API.post("/api/blogs", {
        title: value.title,
        body: value.body,
      }).then(() => {
        message.success("updateEmailConfig");
      });
    }
  };
  return (
    <>
      <Link href={`/blogs`}>List</Link>

      <Form form={form} onFinish={onFinish}>
        <Form.Item>
          <Button type="primary" onClick={showModal}>
            Upload
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item name="title" label="Title">
          <Input placeholder="Basic usage" />
        </Form.Item>
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
            config={{
              ckfinder: {
                uploadUrl: "/api/files",
              },
            }}
          />
        </Form.Item>
      </Form>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/api/files"
        >
          <Button>Choose File</Button>
        </Upload>
      </Modal>
    </>
  );
}
