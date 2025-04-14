import React from "react";
import { Button, Image } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import { useTranslation } from "next-i18next";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useGetTransactionReports from "@/hooks/children/getTransactionReports";

const TransactionSlider = () => {

  const { t: translate } = useTranslation("home");

  const { data:Transactions } = useGetTransactionReports(4);
  console.log("slider data: ", Transactions);
  return (
    <div className="w-full md:h-[500px] mt-8">

      <Swiper
        pagination={{ clickable: true}}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        effect="fade"
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="transaction-slider-container"
      >
        {Transactions?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="w-full md:h-[500px]  flex flex-col md:flex-row items-center justify-center px-6 gap-6 text-white  py-4">
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={`Slide image ${item.id}`}
                  className="w-full max-w-[400px] h-[300px] rounded-xl shadow-xl object-cover"
                />
              </div>

              <div className="flex-1 flex items-center justify-center">
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-w-[400px] h-[300px] rounded-xl shadow-xl object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col items-start justify-center text-left space-y-6 max-w-md">
                <p className="text-lg leading-relaxed text-right">{item.desceription}</p>
                <Button
                  size="large"
                  type="primary"
                  className="mt-7 h-[50px] w-[200px] rounded-full border border-solid border-kafalaPrimary bg-kafalaPrimary-400 text-xl !text-white duration-300 hover:!border-kafalaPrimary-300 hover:!bg-kafalaPrimary-300 max-lg:!mx-auto max-lg:block lg:w-full"
                  >
                  {translate("SHOW_ALL_TRANSACTIONS")}
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TransactionSlider;
