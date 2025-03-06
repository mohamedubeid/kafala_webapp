import { Button, Image } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import HeaderSlider from "./HeaderSlider";
import StatisticCard from "./StatisticCard";
import { useTranslation } from "next-i18next";
import useGetTotalSponsoredChildren from "@/hooks/children/getTotalSponsoredChild";
import useDonationsReachChildrenWithoutExpenses from "@/hooks/children/useGetDonationsReachChildrenWithoutExpenses";
import Aos from "aos";

const Header = () => {
  const { t: translate } = useTranslation("home");
  const { t: translateCommon } = useTranslation("common");

  const [windowWidth, setWindowWidth] = useState<number>(0);
  const router = useRouter();
  const { data, refetch } = useGetTotalSponsoredChildren();

  const [aosInitialized, setAosInitialized] = useState(false);

  useEffect(() => {
    if (!aosInitialized) {
      Aos.init({
        once: true,
        duration: 1000,
        easing: "ease-in-out",
      });
      setAosInitialized(true);
    }
  }, [aosInitialized]);

  const {
    data: getDonationsReachChildrenWithoutExpenses,
    refetch: donationNumberRefetch,
  } = useDonationsReachChildrenWithoutExpenses();
  useEffect(() => {
    refetch();
    donationNumberRefetch();
  }, []);
  useEffect(() => {
    refetch();
  }, [data]);

  useEffect(() => {
    refetch();
  }, [getDonationsReachChildrenWithoutExpenses]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const navbar = document.querySelector(".kafala-navbar");
    const mainHeaderSection = document.getElementById("mainHeaderSection");
    const headerContainer = document.getElementById("headerContainer");
    const pagePath = router?.pathname;

    if (navbar && mainHeaderSection && pagePath == "/") {
      const navbarRect = navbar.getBoundingClientRect();
      mainHeaderSection.style.minHeight = "100vh";
    }

    if (navbar && headerContainer && pagePath == "/") {
      const navbarRect = navbar.getBoundingClientRect();
      headerContainer.style.minHeight = "100vh";
    }

    if (mainHeaderSection && pagePath != "/") {
      mainHeaderSection.style.minHeight = "100vh";
    }

    if (headerContainer && pagePath != "/") {
      headerContainer.style.minHeight = "100vh";
    }
  }, [windowWidth, router]);

  return (
    <header id="mainHeaderSection" className="relative">
      <div className="header-overlay absolute left-0 top-0 z-10 h-full w-full bg-header bg-cover bg-bottom opacity-40 grayscale" />
      <div className="header-overlay absolute left-0 top-0 h-full w-full bg-[#011819]" />
      <div className="container relative z-20 h-full w-full">
        <div
          id="headerContainer"
          className="header-content relative flex h-full w-full flex-wrap items-center justify-between py-4 pb-12 lg:flex-nowrap"
        >
          <div className="header-text order-2 w-full lg:order-1 lg:max-w-[50%]">
            <div
              // data-aos="fade-down"
              // data-aos-duration="1000"
              // data-aos-delay="200"
              // data-aos-easing="ease-in-out"
              className="w-full"
            >
              <div className="header-title text-3xl font-extrabold leading-[50px] text-white max-lg:text-center lg:text-5xl lg:leading-[70px]">
                {translate("HEADER_TITLE")}{" "}
                {/* <span className="text-kafalaPrimary-100">
                  {translate("HEADER_TITLE_SPAN")}
                </span> */}
              </div>
              <div className="desc mt-3 text-base text-white max-lg:text-center lg:text-lg">
                {translate("HEADER_DESC")}
              </div>
              <Button
                onClick={() => {
                  router.push("/children/classification");
                }}
                className="mt-7 h-[50px] w-[200px] rounded-full border border-solid border-kafalaPrimary bg-kafalaPrimary text-xl !text-white duration-300 hover:!border-kafalaPrimary-400 hover:!bg-kafalaPrimary-400 max-lg:!mx-auto max-lg:block lg:w-full"
              >
                {translateCommon("DONATE_NOW")}
              </Button>
            </div>

            <div className="header-swiper mt-4 w-full lg:hidden">
              <div className="flex max-w-[450px] items-center justify-center max-lg:mx-auto max-md:max-w-[250px] lg:ms-auto">
                <HeaderSlider />
              </div>
            </div>
            <div className="header-statistics mt-7 flex h-full flex-wrap items-stretch justify-around gap-4 max-sm:flex-col sm:flex-nowrap">
              {typeof data === "number" && !isNaN(data) && data > 0 && (
                <StatisticCard
                  title={translate("HEADER_STATISTIC_TITLE_1")}
                  description=""
                  total={data}
                />
              )}
              {getDonationsReachChildrenWithoutExpenses &&
                !isNaN(
                  parseInt(getDonationsReachChildrenWithoutExpenses.value, 10)
                ) &&
                parseInt(getDonationsReachChildrenWithoutExpenses.value, 10) >
                  0 &&
                typeof data === "number" &&
                !isNaN(data) &&
                data > 0 && (
                  <div className="statistic-line w-[1px] min-w-[1px] bg-white max-md:hidden"></div>
                )}

              {getDonationsReachChildrenWithoutExpenses &&
                !isNaN(
                  parseInt(getDonationsReachChildrenWithoutExpenses.value, 10)
                ) &&
                parseInt(getDonationsReachChildrenWithoutExpenses.value, 10) >
                  0 && (
                  <>
                    <StatisticCard
                      title={translate("HEADER_STATISTIC_TITLE_3")}
                      description={translate("HEADER_STATISTIC_DESC_3")}
                      total={parseInt(
                        getDonationsReachChildrenWithoutExpenses.value,
                        10
                      )}
                      after="%"
                    />
                  </>
                )}
            </div>
          </div>
          <div className="header-swiper order-1 w-full max-lg:hidden lg:order-2 lg:max-w-[50%]">
            <div className="flex max-w-[450px] items-center justify-center max-lg:mx-auto max-md:max-w-[250px] lg:ms-auto">
              <HeaderSlider />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
