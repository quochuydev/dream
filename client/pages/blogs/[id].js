import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";
import { BlogService } from "../../services";

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "*" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const blog = await BlogService.publish.detail(params.id);
  return {
    props: {
      blog,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../../sites/blogs/detail"));
