import { API, APIClient } from "../api";

export default {
  publish: {
    list: async function (query) {
      return await APIClient.get("/api/users", query);
    },
  },
  list: async function (query) {
    const result = await API.get("/api/users", { query });
    return result;
  },
};
