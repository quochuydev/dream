import React from "react";
import { Row, Col } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "antd/dist/antd.css";

import List from "./List";
import Filter from "./Filter";
import { Layout } from "../../components";

export default function Products() {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Slider {...settings}>
            <div>
              <img
                src={
                  "https://xetaigianat.com/wp-content/uploads/2020/10/0392VAQ09011900S-300x256.jpg"
                }
                alt="Hino 15 tấn (2 cầu thật) | Hino FM8JW7A - 8 tấn"
              />
            </div>
            <div>
              <img
                src={
                  "https://xetaigianat.com/wp-content/uploads/2020/10/0392VAQ09011900S-300x256.jpg"
                }
                alt="Hino 15 tấn (2 cầu thật) | Hino FM8JW7A - 8 tấn"
              />
            </div>
            <div>
              <img
                src={
                  "https://xetaigianat.com/wp-content/uploads/2020/10/0392VAQ09011900S-300x256.jpg"
                }
                alt="Hino 15 tấn (2 cầu thật) | Hino FM8JW7A - 8 tấn"
              />
            </div>
            <div>
              <img
                src={
                  "https://xetaigianat.com/wp-content/uploads/2020/10/0392VAQ09011900S-300x256.jpg"
                }
                alt="Hino 15 tấn (2 cầu thật) | Hino FM8JW7A - 8 tấn"
              />
            </div>
          </Slider>
        </Col>
      </Row>
      <Row gutter={15}>
        <Col span={8}>
          <Filter />
        </Col>
        <Col span={16}>
          <List />
        </Col>
      </Row>
    </Layout>
  );
}
