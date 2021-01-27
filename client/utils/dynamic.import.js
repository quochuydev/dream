import React from "react";
import dynamic from "next/dynamic";
import { Spin } from "antd";

import "antd/dist/antd.css";

export const noSSRWithLoadingDynamic = (component) => {
  return dynamic(() => component, {
    ssr: false,
    loading: () => <div className="spin-center">
      <Spin />
    </div>,
  });
};
