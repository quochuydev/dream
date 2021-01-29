import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Input, Button, Modal, Upload } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form, message } from "antd";

import { API } from "../../../../client/api";
import { BlogService } from "../../../services";

import "antd/dist/antd.css";

export default function Post({}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState({ title: "", body: "" });
  const router = useRouter();
  const { id } = router.query;
  const [tags, setTags] = React.useState([]);

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
    if (id) {
      getBlog(id);
    }
  }, []);

  async function getBlog(id) {
    const result = await BlogService.detail(id);
    setData({ title: result.title, body: result.body || "" });
    setTags(result.tags);
  }

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const onFinish = async (value) => {
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
      await BlogService.create({
        title: value.title,
        body: value.body,
        tags,
      });
      message.success("Create blog");
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
