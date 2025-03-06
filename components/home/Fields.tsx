import { Button } from "antd";
import React from "react";
import { fieldsList } from "@/constants/home";
import FieldCard from "./FieldCard";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { fieldList } from "@/constants/fieldList";

const Fields = () => {
  const { t: translate } = useTranslation("home");
  const { t: translateCommon } = useTranslation("common");
  const router = useRouter();
  return (
    <section className="main-sections relative bg-fields bg-cover bg-center">
      <div className="fields-overlay absolute left-0 top-0 h-full w-full" />
      <div className="container relative z-30">
        <div className="flex gap-8 max-lg:flex-col">
          <div className="flex w-full flex-col items-start justify-center lg:max-w-[45%]">
            <div
              className="section-title"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
              data-aos-easing="ease-in-out"
            >
              {translate("FIELD_TITLE")}
            </div>
            <div className="section-desc">
              <ul className="!ps-4">
                {fieldList?.map((field, index) => {
                  const delay = 200 + 50 * (index + 1);
                  return (
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay={delay}
                      data-aos-easing="ease-in-out"
                      className="mb-1 list-disc"
                    >
                      {translate(field.name)}
                    </li>
                  );
                })}
              </ul>
            </div>
            <Button
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={(fieldList?.length * 50 || 500) + 300}
              data-aos-easing="ease-in-out"
              className="mt-7 h-[45px] w-[200px] rounded-full border border-solid border-kafalaPrimary bg-kafalaPrimary text-lg !text-white duration-300 hover:!border-kafalaPrimary-400 hover:!bg-kafalaPrimary-400"
              onClick={() => {
                router.push("/children/list");
              }}
            >
              {translateCommon("DONATE_NOW")}
            </Button>
          </div>
          <div className="w-full lg:max-w-[55%]">
            <div className="fields-list flex flex-wrap gap-6">
              {fieldsList &&
                fieldsList?.length &&
                fieldsList.map((field, index) => (
                  <FieldCard
                    index={index}
                    key={field.id}
                    icon={field.icon}
                    title={translate(field.title)}
                    description={translate(field.description)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fields;
