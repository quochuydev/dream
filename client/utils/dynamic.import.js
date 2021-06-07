import React from "react";
import dynamic from "next/dynamic";

import Loading from "../components/Loading";

import "antd/dist/antd.css";

export const noSSRWithLoadingDynamic = (component) => {
  return dynamic(() => component, {
    ssr: false,
    loading: () => <Loading />,
  });
};
