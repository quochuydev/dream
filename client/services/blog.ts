import { API } from "../api";

export default {
  list: async function (query) {
    const result = await API.get("/api/blogs", query);
    return result;
  },
  create: async function (data) {
    const result = await API.post("/api/blogs", {
      title: data.title,
      body: data.body,
      tags: data.tags,
    });
    return result;
  },
  detail: async function update(id) {
    return await API.get(`/api/blogs/${id}`);
  },
  update: async function update(query, data) {
    return await API.put(`/api/blogs/${query.id}`, {
      title: data.title,
      body: data.body,
      tags: data.tags,
    });
  },
};
