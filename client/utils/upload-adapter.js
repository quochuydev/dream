import axios from "axios";
import _ from "../admin/components/Thumbnail/node_modules/lodash";
import { baseUrl, getHeader } from "../api";

export default class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    const file = await this.loader.file;
    data.append("upload", file);
    return new Promise((resolve, reject) => {
      axios({
        url: `${baseUrl}/api/files`,
        method: "post",
        data,
        headers: getHeader(),
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
