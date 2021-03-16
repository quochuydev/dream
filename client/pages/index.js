import { noSSRWithLoadingDynamic } from "../utils/dynamic.import";
import { BlogService } from "../services";
import { apiFatory, hasToken, APIClient } from "../api";
import { V1, API } from "../api/endpoint";

export async function getServerSideProps(ctx) {
  const initBlogs = await getBlogs(ctx);

  return {
    props: {
      initBlogs,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../sites/blogs"));

async function getBlogs(ctx) {
  const query = { page: 1, limit: 20 };

  const isHasToken = hasToken(ctx);
  if (isHasToken) {
    const Api = apiFatory(ctx);
    const result = await Api.get(V1.BLOGS.LIST, { query });
    return result.items;
  }

  const result = await APIClient.get(API.BLOGS.LIST, { query });
  return result.items;
}
