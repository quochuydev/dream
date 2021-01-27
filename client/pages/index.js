import { noSSRWithLoadingDynamic } from "../utils/dynamic.import";

export default noSSRWithLoadingDynamic(import("../sites/blogs"));

import { BlogService } from "../services";

export async function getStaticProps() {
  const result = await BlogService.publish.list()

  return {
    props: {
      posts: result.items 
    }
  }
}