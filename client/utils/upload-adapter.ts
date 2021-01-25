import axios from "axios";
import _ from "lodash";

function getHeader(option = {}) {
  let base = {
    accesstoken: "accessToken",
  };
  return _.assign({}, base, option);
}

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
        url: `http://localhost:8000/api/files`,
        method: "post",
        data,
        headers: getHeader(),
        // withCredentials: true,
      })
        .then((res) => {
          console.log(res);
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
