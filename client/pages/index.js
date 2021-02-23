import { noSSRWithLoadingDynamic } from "../utils/dynamic.import";
import { BlogService } from "../services";
import { apiFatory, hasToken } from "../api";
import { V1 } from "../api/endpoint";

export async function getServerSideProps(ctx) {
  const initBlogs = await getBlogs(ctx);
  
  return {
    props: {
      initBlogs,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../sites/blogs"));

async function getBlogs(ctx){
  const query = { page: 1, limit: 20 };

  const isHasToken = hasToken(ctx);
  console.log(isHasToken)
  if(isHasToken){
    const API = apiFatory(ctx);
    const result = await API.get(V1.BLOGS.LIST, { query });
    return result.items;
  }
  
  const result = await BlogService.list(query);
  return result.items;
}