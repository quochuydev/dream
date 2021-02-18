import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";

import { apiFatory } from "../../api";

export async function getServerSideProps(ctx) {
  const query = { page: 1, limit: 20 };
  const API = apiFatory(ctx);
  const result = await API.get("/api/blogs", { query });
  const initBlogs = result.items;

  return {
    props: {
      initBlogs,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../../sites/blogs"));
