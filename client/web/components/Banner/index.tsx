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
              "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2697a7115583477.60513de14d3c8.jpg"
            }
          />
        </h3>
      </div>
      <div>
        <h3 className={styles.contentStyle}>
          <img
            src={
              "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/88357382_218508332863044_5569936219082588160_o.png?_nc_cat=103&ccb=1-3&_nc_sid=e3f864&_nc_ohc=Eg_Sz7QspkYAX84A0KY&_nc_ht=scontent.fsgn1-1.fna&_nc_tp=30&oh=0cfffebffbd87f3a63efeb810ea26fac&oe=6084CB87"
            }
          />
        </h3>
      </div>
    </Carousel>
  );
}
