import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";

import { UserService } from "../../services";

export async function getServerSideProps() {
  const initQuery = { page: 1, limit: 20 };
  const result = await UserService.publish.list(initQuery);

  return {
    props: {
      initBlogs: result.items,
    },
  };
}

export default noSSRWithLoadingDynamic(import("../../sites/users"));
