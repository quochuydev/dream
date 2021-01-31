import { API, APIClient } from "../api";

export default {
  publish: {
    list: async function (query) {
      return await APIClient.get("/api/blogs", query);
    },

    detail: async function (id) {
      return await APIClient.get(`/api/blogs/${id}`);
    },
  },

  list: async function (query) {
    const result = await API.get("/api/blogs", { query });
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

  detail: async function detail(id) {
    return await API.get(`/api/blogs/u/${id}`);
  },

  update: async function update(query, body) {
    return await API.put(`/api/blogs/${query.id}`, { body });
  },

  remove: async function remove(id) {
    return await API.delete(`/api/blogs/${id}`);
  },
};
