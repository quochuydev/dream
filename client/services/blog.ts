import { apiFatory, APIClient } from "../api";
import { V1 } from "../api/endpoint";
const API = apiFatory();
export default {
  v1: {
    list: async function (query) {
      return await API.get(V1.BLOGS.LIST, { query });
    },

    create: async function (data) {
      return await API.post(V1.BLOGS.CREATE, {
        body: {
          title: data.title,
          body: data.body,
          tags: data.tags,
          file_id: data.file_id,
        },
      });
    },

    detail: async function detail(id) {
      return await API.get(V1.BLOGS.DETAIL, { params: { id } });
    },

    update: async function update(params, body) {
      return await API.put(V1.BLOGS.UPDATE, { body, params });
    },

    remove: async function remove(id) {
      return await API.delete(V1.BLOGS.DELETE, { params: { id } });
    },
  },

  list: async function (query) {
    return await APIClient.get(API.BLOGS.LIST, { query });
  },

  detail: async function (id) {
    return await APIClient.get(API.BLOGS.DETAIL, { params: { id } });
  },
};
