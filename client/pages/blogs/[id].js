import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";
import { BlogService } from "../../services";
import cookie from "cookie";

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export async function getServerSideProps({ req, params, res }) {
  try {
    // const cookies = parseCookies(req);
    // const blog = await BlogService.detail(params.id, {
    //   token: cookies.token,
    // });
    const blog = await BlogService.publish.detail(params.id);
    return {
      props: {
        blog,
      },
    };
  } catch (error) {
    return error;
  }
}

export default noSSRWithLoadingDynamic(import("../../sites/blogs/detail"));
