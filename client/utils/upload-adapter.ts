import axios from "axios";
import _ from "lodash";
import { BACKEND_URL, getToken, getHeader } from "../api";

export default class UploadAdapter {
  loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    const file = await this.loader.file;
    data.append("upload", file);
    return new Promise((resolve, reject) => {
      axios({
        url: `${BACKEND_URL}/api/files`,
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
