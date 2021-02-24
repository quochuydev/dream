import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";
import { apiFatory, hasToken } from "../../api";
import { BlogService } from "../../services";
import { V1 } from '../../api/endpoint'

export async function getServerSideProps(ctx) {
  const blog = await getBlog(ctx);

  return {
    props: {
      blog,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../../sites/blogs/detail"));

async function getBlog(ctx){
  const isHasToken = hasToken(ctx);
  if(isHasToken){
    const API = apiFatory(ctx);
    const { params } = ctx
    const blog = await API.get(V1.BLOGS.DETAIL, { params });
    return blog;
  }
  
  const blog = await BlogService.detail(ctx.params.id);
  return blog;
}