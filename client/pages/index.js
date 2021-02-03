import { noSSRWithLoadingDynamic } from "../utils/dynamic.import";

import { BlogService } from "../services";

export async function getServerSideProps() {
  const initQuery = { page: 1, limit: 20 };
  const result = await BlogService.publish.list(initQuery);

  return {
    props: {
      initBlogs: result.items,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../sites/blogs"));
