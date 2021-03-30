import { getSession } from "next-auth/client";
import { noSSRWithLoadingDynamic } from "../../utils/dynamic.import";

export default noSSRWithLoadingDynamic(import("../../sites/admin"));

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/admin/users",
        permanent: false,
      },
    };
  }
}
