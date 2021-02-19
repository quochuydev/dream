import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";
import { BlogService } from "../services";
import { apiFatory, hasToken } from "../../api";

export async function getServerSideProps(ctx) {
  // const isHasToken = hasToken(ctx);
  // if(isHasToken){
  // }

  // const query = { page: 1, limit: 20 };
  // const API = apiFatory(ctx);
  // const result = await API.get("/api/v1/blogs", { query });
  
  const initQuery = { page: 1, limit: 20 };
  const result = await BlogService.v1.list(initQuery);
  const initBlogs = result.items;

  return {
    props: {
      initBlogs,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../../sites/blogs"));
