import { apiFatory, APIClient } from "../api";
import { BLOG } from "../api/endpoint";

export default (ctx) => {
  const API = apiFatory(ctx);
  return {
    list: async function (query) {
      return await API.get(BLOG.LIST, { query });
    },

    create: async function (body) {
      return await API.post(BLOG.CREATE, { body });
    },

    detail: async function detail(id) {
      return await API.get(BLOG.DETAIL, { params: { id } });
    },

    update: async function update(params, body) {
      return await API.put(BLOG.UPDATE, { body, params });
    },

    remove: async function remove(id) {
      return await API.delete(BLOG.DELETE, { params: { id } });
    },
  };
};
