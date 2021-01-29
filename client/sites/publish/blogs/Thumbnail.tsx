import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import { BACKEND_URL, getToken } from "../../../../client/api";
import _ from "lodash";

import "antd/dist/antd.css";

export default function Thumbnail({ ...props }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function getHeader(option = {}) {
    let base = {
      accesstoken: getToken(),
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
    <div {...props}>
      <Button type="primary" onClick={showModal}>
        Upload
      </Button>
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
