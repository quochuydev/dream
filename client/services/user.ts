import { API, APIClient } from "../api";

export default {
  list: async function (query) {
    return await API.get("/api/users", { query });
  },

  create: async function (body) {
    return await API.post("/api/users", { body });
  },

  detail: async function detail(id) {
    return await APIClient.get(`/api/users/${id}`);
  },

  update: async function update(query, body) {
    return await API.put(`/api/users/${query.id}`, { body });
  },

  remove: async function remove(id) {
    return await API.delete(`/api/users/${id}`);
  },
};
