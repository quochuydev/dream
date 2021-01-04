import React, { useState, useEffect } from "react";
import { Input, Form, Button } from "antd";

import ImageCrop from "./image-crop";

export default function (props) {
  const [form] = Form.useForm();
  let value = "first_name";

  useEffect(() => {
    form.setFieldsValue({ first_name: value });
  }, [value]);

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name={"first_name"}>
          <Input placeholder={"placeholder"} size="large" disabled={false} />
        </Form.Item>
        <Form.Item className="footer">
          <Button type="primary" htmlType="submit" loading={false}>
            submit
          </Button>
        </Form.Item>
      </Form>
      <ImageCrop />
    </div>
  );
}
