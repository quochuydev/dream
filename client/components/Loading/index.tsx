import React from "react";
import { Spin } from "antd";

import "antd/dist/antd.css";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.spinCenter}>
      <Spin />
    </div>
  );
}
