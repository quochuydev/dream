import React, { useEffect } from "react";
import { Spin } from "antd";

import "antd/dist/antd.css";

export default function Loading({}) {
  return (
    <>
      <div className="spin-center">
        <Spin />
      </div>
    </>
  );
}
