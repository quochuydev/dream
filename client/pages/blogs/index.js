import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";
import { BlogService } from "../../services";

export default noSSRWithLoadingDynamic(import("../../sites/blogs"));

export async function getStaticProps() {
  const initQuery = { page: 1, limit: 20 };
  const result = await BlogService.publish.list(initQuery)

  return {
    props: {
      posts: result.items 
    }
  }
}