export default class Fetch {
  baseURL;
  config;
  handle;

  constructor(baseURL, config, handle) {
    this.baseURL = baseURL;
    this.config = config;
    this.handle = handle;
  }

  buildURL = (url) => this.baseURL + url;

  checkResponseContentType = (contentType) => {
    const contentTypeArr = contentType?.split(";");
    if (contentTypeArr.includes("application/json")) {
      return "json";
    }
    return "text";
  };

  buildRequest(url, method, body) {
    return new Promise((resolve, reject) => {
      try {
        
      for (const before of this.handle.before) {
        before(this.config)
      }

      const {
        credentials,
        headers,
        integrity,
        cache,
        keepalive,
        mode,
        redirect,
        referrer,
        referrerPolicy,
        signal,
        window,
        notStringifyBody,
      } = this.config;

      body = notStringifyBody ? body : JSON.stringify(body);
      fetch(this.buildURL(url), {
        method,
        credentials,
        headers,
        cache,
        integrity,
        keepalive,
        mode,
        redirect,
        referrer,
        referrerPolicy,
        signal,
        window,
        body,
      })
        .then(async (response) => {
          let contentType = response.headers.get("content-type");
          let type = "text";
          if (contentType) {
            contentType = contentType.replace(/ +/g, "");
            type = this.checkResponseContentType(contentType);
          }
          const data = await response[type]();
          if (!response.ok) {
            const error = {};
            error.data = data;
            error.code = response.status;
            error.message = data.message;
            error.isError = true;
            throw error;
          }
          return data;
        })
        .then((data) => resolve(data))
        .catch((err) => {
          reject(err);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async get(url, objQuery = {}) {
    if (objQuery) {
      const query = Object.keys(objQuery)
        .map((key) => {
          if (objQuery[key]) {
            return key + "=" + objQuery[key];
          }
        })
        .filter((e) => !!e)
        .join("&");
      if (query) {
        url = `${url}?${query}`;
      }
    }
    return await this.buildRequest(url, "GET");
  }

  async post(url, body) {
    return await this.buildRequest(url, "POST", body);
  }

  async put(url, body) {
    return await this.buildRequest(url, "PUT", body);
  }

  async delete(url) {
    return await this.buildRequest(url, "DELETE");
  }
}
