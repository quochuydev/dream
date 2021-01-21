import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Select from "react-select";
import _ from "lodash";
import axios from "axios";

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
      API.get(`/api/blogs/${id}`).then((blog) => {
        setData({ title: blog.title, body: blog.body || "" });
        setTags(blog.tags);
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
        tags,
      })
        .then(() => {
          message.success("Update blog");
        })
        .catch((error) => {
          message.error(error.message);
        });
    } else {
      API.post("/api/blogs", {
        title: value.title,
        body: value.body,
        tags,
      })
        .then(() => {
          message.success("Create blog");
        })
        .catch((error) => {
          message.error(error.message);
        });
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

  // const baseHeaders = {
  //   'AccessToken': token ? token : null,
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  // };

  function getHeader(option = {}) {
    let base = {
      accesstoken: "accessToken",
    };
    return _.assign({}, base, option);
  }

  const uploadSetting = {
    action: "http://localhost:3000/api/files",
    headers: getHeader(),
    accept: ".jpg, .png",
    // data={(e) => console.log(e)}
    beforeUpload: (file, fileList) => {
      return true;
    },
    onPreview: (e) => console.log(e),
    onChange: (e) => {
      setFileList(e.fileList);
    },
  };

  class UploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    async upload() {
      const data = new FormData();
      const file = await this.loader.file;
      data.append("upload", file);
      return new Promise((resolve, reject) => {
        axios({
          url: `/api/files`,
          method: "post",
          data,
          headers: getHeader(),
          withCredentials: true,
        })
          .then((res) => {
            var resData = res.data;
            resData.default = resData.url;
            resolve(resData);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    }

    abort() {}
  }

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
                uploadUrl: "/api/files",
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
          // showUploadList={false}
          {...uploadSetting}
        >
          <Button>Choose File</Button>
        </Upload>
        {fileList.map((e) => (
          <div key={e.uid}>
            {e.response && (
              <a
                onClick={() => {
                  const newBody =
                    form.getFieldValue("body") +
                    `<figure class="image"><img src="${e.response.url}"/></figure>`;
                  setData({ ...data, body: newBody });
                }}
              >
                {e.response.url}
              </a>
            )}
          </div>
        ))}
      </Modal>
    </>
  );
}
