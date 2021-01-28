import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";

export default noSSRWithLoadingDynamic(import("../../sites/blogs"));

import { BlogService } from "../../services";

export async function getStaticProps() {
  const initQuery = { page: 1, limit: 20 };
  const result = await BlogService.publish.list(initQuery);

  return {
    props: {
      initBlogs: result.items,
    },
  };
}
