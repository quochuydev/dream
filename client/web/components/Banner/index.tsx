import React from "react";
import { Carousel } from "antd";
import styles from "./index.module.css";

export default function Banner(): React.ReactElement {
  return (
    <Carousel autoplay>
      <div>
        <h3 className={styles.contentStyle}>
          <img
            src={
              "https://xetaigianat.com/wp-content/uploads/2020/10/2-1400x614.jpg"
            }
          />
        </h3>
      </div>
      <div>
        <h3 className={styles.contentStyle}>
          <img
            src={
              "https://xetaigianat.com/wp-content/uploads/2020/10/3-1400x613.jpg"
            }
          />
        </h3>
      </div>
    </Carousel>
  );
}
