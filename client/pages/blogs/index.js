import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";
import { BlogService } from "../../services";

export async function getServerSideProps(ctx) {
  const initBlogs = await getBlogs(ctx);
  return {
    props: {
      initBlogs,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../../web/pages/Blogs"));

async function getBlogs(ctx) {
  const query = { page: 1, limit: 5 };
  const blogService = BlogService(ctx);
  const result = await blogService.list(query);
  return result.items;
}
