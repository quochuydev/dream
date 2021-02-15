import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";

import { BlogService } from "../../services";

export async function getServerSideProps({ req }) {
  const query = { page: 1, limit: 20 };
  const accessToken = req.cookies['accessToken'];
  console.log('accessToken', accessToken)

  const result = await BlogService.list(query, accessToken);
  let initBlogs = result.items;

  return {
    props: {
      initBlogs : [],
    },
  };
}

export default noSSRWithLoadingDynamic(import("../../sites/blogs"));
