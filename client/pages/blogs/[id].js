import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";
import { BlogService } from "../../services";

export async function getServerSideProps(ctx) {
  const blog = await getBlog(ctx);

  return {
    props: { blog },
  };
}

export default noSSRWithLoadingDynamic(import("../../sites/Blog/Detail"));

async function getBlog(ctx) {
  const blogService = BlogService(ctx);
  const blog = await blogService.detail(ctx.params.id);
  return blog;
}
