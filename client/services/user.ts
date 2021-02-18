import { API, APIClient } from "../api";

export default {
  publish: {
    list: async function (query) {
      return await APIClient.get("/api/users", { query });
    },

    detail: async function (id) {
      return await APIClient.get(`/api/users/${id}`);
    },
  },

  list: async function (query) {
    return await API.get("/api/users", { query });
  },

  create: async function (data) {
    return await API.post("/api/users", {
      body: {
        firstName: data.firstName,
      },
    });
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
