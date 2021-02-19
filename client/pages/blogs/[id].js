import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";
import { apiFatory } from "../../api";

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export async function getServerSideProps({ req, params, res }) {
  const API = apiFatory({ req });
  const blog = await API.get("/api/blogs/{id}", { params });
  return {
    props: {
      blog,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../../sites/blogs/detail"));
