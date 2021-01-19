import { noSSRWithLoadingDynamic } from "../../../client/utils/dynamic.import";

export default noSSRWithLoadingDynamic(
  import("../../../client/pages/publish/blogs/edit")
);
