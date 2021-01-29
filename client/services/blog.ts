import { API, APIClient } from "../api";
import Router from "next/router";

function handleError() {
  localStorage.clear();
  Router.push(`/401`);
  return;
}

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
    const result = await API.get("/api/blogs", query);
    return {
      total: result.total,
      blogs: result.items,
    };
  },

  create: async function (data) {
    const result = await API.post("/api/blogs", {
      title: data.title,
      body: data.body,
      tags: data.tags,
    });
    return result;
  },

  detail: async function detail(id, options?) {
    try {
      const result = await API.get(`/api/blogs/${id}/edit`, options);
      return result;
    } catch (error) {
      handleError();
    }
  },

  update: async function update(query, data) {
    return await API.put(`/api/blogs/${query.id}`, {
      title: data.title,
      body: data.body,
      tags: data.tags,
    });
  },

  remove: async function remove(id) {
    const result = await API.delete(`/api/blogs/${id}`);
    return result;
  },
};
