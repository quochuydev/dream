import { apiFatory } from "../api";

export default (ctx?: any) => {
  const API = apiFatory(ctx);

  return {
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
};
