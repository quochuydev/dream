import React from "react";
import dynamic from "next/dynamic";

import { Loading } from "../web/components";

import "antd/dist/antd.css";

export const noSSRWithLoadingDynamic = (component) => {
  return dynamic(() => component, {
    ssr: false,
    loading: () => <Loading />,
  });
};
