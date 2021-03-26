import { noSSRWithLoadingDynamic } from "../utils/dynamic.import";
import { apiFatory } from "../api";
import { V1 } from "../api/endpoint";

export async function getServerSideProps(ctx) {
  const initBlogs = await getBlogs(ctx);

  return {
    props: {
      initBlogs,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../sites/index"));

async function getBlogs(ctx) {
  const query = { page: 1, limit: 20 };
  const Api = apiFatory(ctx);
  const result = await Api.get(V1.BLOGS.LIST, { query });
  return result.items;
}
