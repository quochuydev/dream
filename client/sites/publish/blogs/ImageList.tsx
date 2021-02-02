import React, { useState } from "react";
import _ from "lodash";
import { Button, Modal, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { BACKEND_URL, getHeader } from "../../../../client/api";

import "antd/dist/antd.css";
import "./style.css";

export default function Thumbnail({ ...props }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
    <div {...props}>
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        <Button type="primary" onClick={showModal}>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div>Upload</div>
        </Button>
      )}
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
          <p>Choose File</p>
        </Upload>
      </Modal>
    </div>
  );
}
