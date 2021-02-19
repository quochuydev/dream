import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";
import { apiFatory } from "../../api";
import { BlogService } from "../../services";

export async function getServerSideProps({ req, params, res }) {
  // const API = apiFatory({ req });
  // const blog = await API.get("/api/v1/blogs/{id}", { params });
  
  const blog = await BlogService.v1.detail(params.id);

  return {
    props: {
      blog,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../../sites/blogs/detail"));
