import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Select from "react-select";
import _ from "lodash";

import { Input, Button, Modal, Upload } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form, message } from "antd";
import UploadAdapter from "../../../utils/upload-adapter";

import { API, BACKEND_URL } from "../../../../client/api";
import { BlogService } from "../../../services";

import "antd/dist/antd.css";

export default function Post({}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState({ title: "", body: "" });
  const router = useRouter();
  const { id } = router.query;
  const [tags, setTags] = React.useState([]);
  const [fileList, setFileList] = React.useState([]);

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
    try {
    } catch (error) {
      message.error(error.message);
    }
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
      await BlogService.create(
        { id },
        {
          title: value.title,
          body: value.body,
          tags,
        }
      );
      message.success("Create blog");
    }
  };

  const Menu = (props) => {
    const { innerRef, innerProps, children, selectProps } = props;
    return (
      <div ref={innerRef} {...innerProps}>
        <div>ADD {selectProps.inputValue}</div>
        {children}
        <div>-+</div>
      </div>
    );
  };
  const idTag = `react-select-tags`;

  function getHeader(option = {}) {
    let base = {
      accesstoken: "accessToken",
    };
    return _.assign({}, base, option);
  }

  const uploadSetting = {
    action: `${BACKEND_URL}/api/files`,
    headers: getHeader(),
    accept: ".jpg, .png",
    onPreview: (e) => console.log(e),
    onChange: (e) => {
      setFileList(e.fileList);
    },
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
        <Select
          inputId={idTag}
          options={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
          ]}
          value={tags}
          isMulti={true}
          components={{ Menu }}
          onChange={(value) => {
            if (!value) {
              value = [];
            }
            setTags(value);
          }}
          onInputChange={(e) => {
            if (e) {
              console.log(e);
            }
          }}
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
                  accesstoken: "accessToken",
                  Authorization: "Bearer accessToken",
                },
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
          name="upload"
          listType="picture-card"
          className="avatar-uploader"
          fileList={fileList}
          {...uploadSetting}
        >
          <Button>Choose File</Button>
        </Upload>
      </Modal>
    </>
  );
}
