import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.css";

export default function Sliders(): React.ReactElement {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const banners = [
    {
      src:
        "https://xetaigianat.com/wp-content/uploads/2020/10/ben6-300x300.jpg",
      name: "Hino 15 tấn (2 cầu thật) | Hino FM8JW7A - 8 tấn",
    },
    {
      src:
        "https://xetaigianat.com/wp-content/uploads/2020/12/xe-ben-hino-15-t-n-xe-ben-hino-15-tan-fm-4-300x300.jpg",
      name: "Ben Hino FM8JN7A – 2 cầu thật | Ben Hino 10 khối",
    },
    {
      src:
        "https://xetaigianat.com/wp-content/uploads/2020/10/ben6-300x300.jpg",
      name: "Hino 15 tấn (2 cầu thật) | Hino FM8JW7A - 8 tấn",
    },
    {
      src:
        "https://xetaigianat.com/wp-content/uploads/2020/12/xe-ben-hino-15-t-n-xe-ben-hino-15-tan-fm-4-300x300.jpg",
      name: "Ben Hino FM8JN7A – 2 cầu thật | Ben Hino 10 khối",
    },
    {
      src:
        "https://xetaigianat.com/wp-content/uploads/2020/10/ben6-300x300.jpg",
      name: "Hino 15 tấn (2 cầu thật) | Hino FM8JW7A - 8 tấn",
    },
    {
      src:
        "https://xetaigianat.com/wp-content/uploads/2020/12/xe-ben-hino-15-t-n-xe-ben-hino-15-tan-fm-4-300x300.jpg",
      name: "Ben Hino FM8JN7A – 2 cầu thật | Ben Hino 10 khối",
    },
  ];

  return (
    <Slider {...settings}>
      {banners.map((e, i) => (
        <div key={i}>
          <img src={e.src} alt={e.name} />
        </div>
      ))}
    </Slider>
  );
}
