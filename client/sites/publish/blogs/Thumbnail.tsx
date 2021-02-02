import React, { useState } from "react";
import _ from "lodash";
import { Button, Modal, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { BACKEND_URL, getHeader } from "../../../../client/api";

import "antd/dist/antd.css";
import "./style.css";
import { fail } from "assert";

export default function Thumbnail({ selected, callback, ...props }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(selected?.url);
  const [loading, setLoading] = useState(false);

  const uploadSetting = {
    action: `${BACKEND_URL}/api/files`,
    headers: getHeader(),
    accept: ".jpg, .png",
    onPreview: (e) => console.log(e),
    onChange: (e) => {
      if (e.file.status === "uploading") {
        setLoading(true);
        return;
      }
      if (e.file.status === "done") {
        setLoading(false);
      }
      if (e.file.response && e.file.response.url) {
        setImageUrl(e.file.response.url);
        callback(e.file.response);
      }
    },
  };

  return (
    <div {...props}>
      <Upload
        name="upload"
        listType="picture-card"
        className="avatar-uploader"
        multiple={false}
        showUploadList={false}
        fileList={fileList}
        {...uploadSetting}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div>Upload</div>
          </div>
        )}
      </Upload>
    </div>
  );
}
