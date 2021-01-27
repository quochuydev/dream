import { API } from "../api";

export default {
  list: async function (query) {
    const result = await API.get("/api/tags", query);
    return result;
  },
  create: async function (data) {
    const result = await API.post("/api/tags", {
      name: data.name,
    });
    return result;
  },
};
