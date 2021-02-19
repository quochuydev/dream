import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";
import { BlogService } from "../../services";
import { apiFatory, hasToken } from "../../api";

export async function getServerSideProps(ctx) {
  const initBlogs = await getBlogs(ctx);
  return {
    props: {
      initBlogs,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../../sites/blogs"));

async function getBlogs(ctx){
  const query = { page: 1, limit: 20 };

  const isHasToken = hasToken(ctx);
  if(isHasToken){
    const API = apiFatory(ctx);
    const result = await API.get("/api/v1/blogs", { query });
    return result.items;
  }
  
  const result = await BlogService.v1.list(query);
  return result.items;
}