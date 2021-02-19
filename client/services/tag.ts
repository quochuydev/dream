import { API } from "../api";

export default {
  list: async function (query) {
    return await API.get("/api/tags", { query });
  },
  create: async function (data) {
    const result = await API.post("/api/tags", {
      body: {
        name: data.name,
      },
    });
    return result;
  },
};
