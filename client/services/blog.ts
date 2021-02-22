import { API, APIClient } from "../api";
import { BLOGS, V1 } from "../api/endpoint";

export default {
  v1: {
    list: async function (query) {
      return await API.get(V1.BLOGS.LIST, { query });
    },

    detail: async function (id) {
      return await APIClient.get(`/api/blogs/${id}`);
    },
  },

  list: async function (query) {
    return await APIClient.get(BLOGS.LIST, { query });
  },

  create: async function (data) {
    return await API.post(BLOGS.CREATE, {
      body: {
        title: data.title,
        body: data.body,
        tags: data.tags,
        file_id: data.file_id,
      },
    });
  },

  detail: async function detail(id) {
    return await APIClient.get(`/api/blogs/${id}`);
  },

  update: async function update(query, body) {
    return await API.put(`/api/blogs/${query.id}`, { body });
  },

  remove: async function remove(id) {
    return await API.delete(`/api/blogs/${id}`);
  },
};
