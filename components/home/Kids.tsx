import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import KidCard from "@/partial/KidCard";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import useGetChildrenQuery from "@/hooks/children/useGetChildrenQuery";
import { useRouter } from "next/router";
import { OrphanClassification } from "@/types/enm";
import useGetChildStatistics from "@/hooks/children/useGetChildsStatistics";

const Kids = () => {
  const { data: kids, isLoading } = useGetChildrenQuery(
    "",
    1,
    10,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    true
  );
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [slidPerView, setSlidPerView] = useState<number>(3);
  const { i18n, t: translate } = useTranslation("home");
  const { t: translateCommon } = useTranslation("common");
  const { data: childStatistics } = useGetChildStatistics();

  const currentLocale = i18n?.language;
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 1200) {
      setSlidPerView(3);
    } else {
      setSlidPerView(2);
    }
    if (windowWidth < 768) {
      setSlidPerView(1);
    }
  }, [windowWidth]);

  return (
    <section className="main-sections">
      <div className="container">
        <div className="kids-header flex flex-wrap items-start justify-between gap-3 md:text-lg">
          <div className="kids-title section-title">
            {translate("CLASSIFICATIONS")}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 lg:flex-nowrap lg:justify-between">
          <div
            onClick={() => {
              router.push(
                `/children/list?orphanClassification=${OrphanClassification.OTHER}`
              );
            }}
            className="relative h-[300px] flex-shrink-0 transform cursor-pointer overflow-hidden rounded-lg text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 md:w-1/3"
          >
            <img
              src="https://kafala-dev-s3.s3.us-west-1.amazonaws.com/8a2144c0-9f17-44bd-9abc-a7fb47d622b5-pikaso_texttoimage_-big-brother-crying-with-small-brother-in-Gaza%201.png"
              alt="Child 1"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold">أيتام الأب والأم</h2>
              <p className="text-md">عدد الأطفال</p>
              <p className="text-3xl font-bold">
                {childStatistics?.fatherAndMotherCount}
              </p>
            </div>
          </div>

          <div
            onClick={() => {
              router.push(
                `/children/list?orphanClassification=${OrphanClassification.FATHER_ORPHAN}`
              );
            }}
            className="relative h-[300px] flex-shrink-0 transform cursor-pointer overflow-hidden rounded-lg text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 md:w-1/3"
          >
            <img
              src="https://kafala-dev-s3.s3.us-west-1.amazonaws.com/861e9d39-6e95-48b5-a03a-e71cd60dbd86-childClassification2.png"
              alt="Child 2"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold">أيتام الأب</h2>
              <p className="text-md">عدد الأطفال</p>
              <p className="text-3xl font-bold">
                {childStatistics?.fatherOrphanCount}
              </p>
            </div>
          </div>

          <div
            onClick={() => {
              router.push(
                `/children/list?orphanClassification=${OrphanClassification.MOTHER_ORPHAN}`
              );
            }}
            className="relative h-[300px] flex-shrink-0 transform cursor-pointer overflow-hidden rounded-lg text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 md:w-1/3"
          >
            <img
              src="https://kafala-dev-s3.s3.us-west-1.amazonaws.com/f3840372-831d-4a78-89b3-c28ec7fc7955-Frame%201000003276%20%282%29.png"
              alt="Child 3"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold">أيتام الأم</h2>
              <p className="text-md">عدد الأطفال</p>
              <p className="text-3xl font-bold">
                {childStatistics?.motherOrphanCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kids;
