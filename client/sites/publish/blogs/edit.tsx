import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import _ from "lodash";
import { Form, message, Input, Button, Row, Col } from "antd";
import { EyeOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
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
  const [data, setData] = useState<any>({ title: "", body: "" });
  const [tags, setTags] = useState([]);
  const [fileId, setFileId] = useState(null);

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
      setFileId(result.fileId);
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
            file_id: fileId,
          }
        );
        message.success("Update blog");
      } else {
        const result = await BlogService.create({
          title: value.title,
          body: value.body,
          tags,
          fileId,
        });
        message.success("Create blog");
        Router.push(`/publish/blogs/edit/${result._id}`);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Layout sub={[{ name: "Blogs", to: "/blogs" }, { name: "test test" }]}>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={8}>
          <Col span={24}>
            {id && (
              <Link href={`/blogs/${id}`}>
                <Button icon={<EyeOutlined />}>Preview</Button>
              </Link>
            )}
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save
            </Button>
          </Col>

          <Col span={18}>
            <p>Title</p>
            <Form.Item name="title">
              <Input size="large" placeholder="Title..." />
            </Form.Item>

            <p>Description:</p>
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
                      Authorization: `Bearer ${getToken()}`,
                    },
                  },
                }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <p>Tags:</p>
            <TagSelect
              selected={tags}
              setSelected={setTags}
              className="m-b-lg"
            />

            <p>Photo:</p>
            <Thumbnail
              className=""
              selected={data.file}
              callback={(e) => {
                setFileId(e._id);
              }}
            />
          </Col>
          <Col span={24}>
            <hr />
            {id && (
              <Button
                icon={<DeleteOutlined />}
                type="default"
                onClick={async () => {
                  await BlogService.remove(id);
                  message.success("Delete success.");
                }}
              >
                Remove
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Layout>
  );
}
