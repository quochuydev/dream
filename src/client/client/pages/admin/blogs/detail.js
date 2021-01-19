import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Select from "react-select";

import { Input, Button, Modal, Upload } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form, message } from "antd";

import API from "../../../../client/api";

import "antd/dist/antd.css";

export default function Post({}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState({ title: "", body: "" });
  const router = useRouter();
  const { id } = router.query;
  const [multi, setMulti] = React.useState([]);

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
      API.get(`/api/blogs/${id}`).then((blog) => {
        setData({ title: blog.title, body: blog.body || "" });
        setMulti(blog.tags);
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
        tags: multi,
      }).then(() => {
        message.success("Update blog");
      });
    } else {
      API.post("/api/blogs", {
        title: value.title,
        body: value.body,
        tags: multi,
      }).then(() => {
        message.success("Create blog");
      });
    }
  };

  const Menu = (props) => {
    const { innerRef, innerProps, children, selectProps } = props;
    console.log(props);
    return (
      <div ref={innerRef} {...innerProps}>
        <div>ADD {selectProps.inputValue}</div>
        {children}
        <div>-+</div>
      </div>
    );
  };
  const idTag = `react-select-tags`;

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
        <Select
          inputId={idTag}
          options={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
          ]}
          value={multi}
          isMulti={true}
          components={{ Menu }}
          onChange={(value) => {
            if (!value) {
              value = [];
            }
            setMulti(value);
          }}
          onInputChange={(e) => console.log(e)}
        />
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
