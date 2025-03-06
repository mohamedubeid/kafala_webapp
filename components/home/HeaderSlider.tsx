import React from "react";
import { Button, Image } from "antd";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";

const HeaderSlider = () => {
  return (
    <Swiper
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      effect={"fade"}
      modules={[EffectFade, Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="swiper-content my-4">
          <Image
            preview={false}
            src="/assets/home/header-1.jpg"
            alt="header"
            className="header-swiper-img object-scale-down object-center"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-content my-4">
          <Image
            preview={false}
            src="/assets/home/header-2.jpg"
            alt="header"
            className="header-swiper-img object-scale-down object-center"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper-content my-4">
          <Image
            preview={false}
            src="/assets/home/header-1.jpg"
            alt="header"
            className="header-swiper-img object-scale-down object-center"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeaderSlider;
