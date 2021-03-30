import { apiFatory } from "../api";
import { USER } from "../api/endpoint";

export default (ctx) => {
  const API = apiFatory(ctx);

  return {
    list: async function (query) {
      return await API.get(USER.LIST, { query });
    },

    detail: async function detail(id) {
      return await API.get(USER.DETAIL, { params: { id } });
    },

    create: async function (body) {
      return await API.post(USER.CREATE, { body });
    },

    update: async function update(id, data) {
      return await API.put(USER.UPDATE, { params: { id }, body: data });
    },

    remove: async function remove(id) {
      return await API.delete(USER.DELETE, { params: { id } });
    },
  };
};
