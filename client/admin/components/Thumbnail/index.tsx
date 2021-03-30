import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { baseUrl, getHeader } from "../../../api";

import "antd/dist/antd.css";
import styles from "./index.module.css";

export default function Thumbnail({ selected, callback, ...props }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selected) {
      setImage(selected);
    }
  }, [selected]);

  const uploadSetting = {
    action: `${baseUrl}/api/files`,
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
        setImage(e.file.response);
        callback(e.file.response);
      }
    },
  };

  return (
    <div {...props}>
      <Upload
        name="upload"
        listType="picture-card"
        className={styles.avatarUploader}
        multiple={false}
        showUploadList={false}
        {...uploadSetting}
      >
        {image && image.url ? (
          <img src={image.url} alt="avatar" style={{ width: "100%" }} />
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
