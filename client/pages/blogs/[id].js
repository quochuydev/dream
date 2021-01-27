import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";
import { BlogService } from "../../services";

export async function getStaticPaths() {
  const result = await BlogService.publish.list()
  const paths = result.items.map(e => Object({ params: { id: e._id } }));

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const blog = await BlogService.publish.detail(params.id);

  return {
    props: {
      blog
    }
  }
}

export default noSSRWithLoadingDynamic(import("../../sites/blogs/detail"));
