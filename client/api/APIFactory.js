import _ from "lodash";
import fetch from "isomorphic-fetch";

const APIFactory = ({ baseUrl, setHeaders, notStringify }) => {
  const result = {
    get: async (endpoint, config) => {
      return await call(endpoint, config, "GET");
    },

    post: async (endpoint, config) => {
      return await call(endpoint, config, "POST");
    },

    put: async (endpoint, config) => {
      return await call(endpoint, config, "PUT");
    },

    delete: async (endpoint, config) => {
      return await call(endpoint, config, "DELETE");
    },
  };

  return result;

  async function call(endpoint, config = {}, method) {
    try {
      const result = await _call(endpoint, config, method);
      return result;
    } catch (error) {
      if (error.statusCode === 401) {
        // localStorage.clear();
        // Router.push(`/401`);
      }
      throw error;
    }
  }

  function _call(endpoint, config = {}, method) {
    return new Promise((resolve, reject) => {
      const url = makeUrl(endpoint, config);
      const options = {
        method,
        headers: setHeaders(config),
      };
      if (config.body) {
        options.body = options.notStringify
          ? config.body
          : JSON.stringify(config.body);
      }

      const newRequest = new Request(url, options);
      fetch(newRequest)
        .then(async (response) => {
          let contentType = response.headers.get("content-type");
          let type = "text";
          if (contentType) {
            contentType = contentType.replace(/ +/g, "");
            type = checkResponseContentType(contentType);
          }
          const data = await response[type]();
          console.log(method, url, response.status);
          if (!response.ok) {
            throw data;
          }
          return data;
        })
        .then((data) => resolve(data))
        .catch((err) => {
          reject(err);
        });
    });
  }

  function makeUrl(endpoint, config) {
    if (config.params) {
      endpoint = compile(endpoint, config.params);
    }

    let url = baseUrl + endpoint;
    if (config.query) {
      const objQuery = config.query;
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
    return url;
  }

  function checkResponseContentType(contentType) {
    const contentTypeArr = contentType?.split(";");
    if (contentTypeArr.includes("application/json")) {
      return "json";
    }
    return "text";
  }

  function compile(template, data) {
    const result = template.replace(/{.+?}/g, function (matcher) {
      const path = matcher.slice(1, -1).trim();
      return _.get(data, path, "");
    });
    return result;
  }
};

export default APIFactory;
