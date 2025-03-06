import { Button, Image } from "antd";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

const About = () => {
  const { t: translate } = useTranslation("home");
  const { t: translateCommon } = useTranslation("common");
  const router = useRouter();

  return (
    <div className="main-sections">
      <div className="container relative z-30">
        <div className="flex gap-8 max-lg:flex-col">
          <div className="flex w-full flex-col items-start justify-center lg:max-w-[50%]">
            <div
              className=""
              data-aos="fade-down"
              data-aos-duration="1000"
              data-aos-delay="200"
              data-aos-easing="ease-in-out"
              data-aos-offset="100"
            >
              <div className="section-title">{translate("ABOUT_TITLE")}</div>
              <div className="section-desc">{translate("ABOUT_DESC")}</div>
            </div>

            <div className="about-details mt-10 flex flex-col gap-4">
              <div
                className="about-detail-item flex gap-4"
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="200"
                data-aos-easing="ease-in-out"
                data-aos-offset="100"
              >
                <div className="icon min-w-[40px]">
                  <Image
                    preview={false}
                    src="/assets/home/donation-icon.png"
                    alt="icon"
                  />
                </div>
                <div className="">
                  <div className="about-title mb-3 text-2xl font-bold">
                    {translate("ABOUT_TITLE_1")}
                  </div>
                  <div className="about-desc text-sm">
                    {translate("ABOUT_DESC_1")}
                  </div>
                </div>
              </div>
              <div
                className="about-detail-item flex gap-4"
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="400"
                data-aos-easing="ease-in-out"
                data-aos-offset="100"
              >
                <div className="icon min-w-[40px]">
                  <Image
                    preview={false}
                    src="/assets/home/help-icon.png"
                    alt="icon"
                  />
                </div>
                <div className="">
                  <div className="about-title mb-3 text-2xl font-bold">
                    {translate("ABOUT_TITLE_2")}
                  </div>
                  <div className="about-desc text-sm">
                    {translate("ABOUT_DESC_2")}
                  </div>
                </div>
              </div>
            </div>
            <Button
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="600"
              data-aos-easing="ease-in-out"
              data-aos-offset="100"
              className="mt-7 h-[45px] w-[200px] rounded-full border border-solid border-kafalaPrimary bg-white text-lg !text-kafalaPrimary duration-300 hover:!border-kafalaPrimary-400 hover:!bg-kafalaPrimary hover:!text-white"
              onClick={() => router.push("/about")}
            >
              {translateCommon("MORE_ABOUT")}
            </Button>
          </div>
          <div className="w-full lg:max-w-[50%]">
            <Image
              preview={false}
              src="/assets/home/about-img.png"
              alt="icon"
              className="max-lg:max-w-[400px]"
              wrapperClassName="max-lg:flex max-lg:justify-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
