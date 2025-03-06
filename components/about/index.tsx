import { ITEMS_PER_PAGE } from "@/constants/pagination";
import useGetChildrenQuery from "@/hooks/children/useGetChildrenQuery";
import KidCard from "@/partial/KidCard";
import { Col, Pagination, Row } from "antd";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import KidAboutCard from "./KidAboutCard";
import useGetAbout from "@/hooks/about/useGetAbout";
import useGetAboutChildren from "@/hooks/about/useGetAboutChildren";

const About = () => {
  const { t: translate } = useTranslation();
  const { data } = useGetAbout();
  const { data: children } = useGetAboutChildren("getAboutChildren");

  return (
    <div className="about-page min-h-[500px] w-full overflow-hidden bg-kafalaLight-100 pb-4">
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="min-h-[500px] bg-white px-6 py-8">
          <div className="about-header flex flex-wrap items-start justify-between gap-4 md:text-lg">
            <div className="kids-title section-title text-2xl font-bold">
              {translate("about:ABOUT_TITLE")}
            </div>
          </div>
          <pre className="about-desc overflow-wrap mt-3 max-w-full whitespace-pre-wrap break-words bg-kafalaLight p-6">
            {data?.value || ""}
          </pre>
          {/* 
          {children &&
          (!!children?.childsWithSponsorShip?.length ||
            !!children?.getChildsWithoutSponsorShips?.length) ? (
            <>
              <div className="about-cards my-16 flex w-full justify-center">
                <Row
                  gutter={[24, 24]}
                  className="w-full max-w-[1024px] justify-center px-12"
                >
                  {children?.childsWithSponsorShip &&
                    !!children?.childsWithSponsorShip?.length &&
                    children?.childsWithSponsorShip?.map((child) => {
                      return (
                        <Col
                          key={child.id}
                          xs={24}
                          sm={12}
                          xl={8}
                          className="aboutCard"
                        >
                          <KidAboutCard child={child} />
                        </Col>
                      );
                    })}

                  {children?.getChildsWithoutSponsorShips &&
                    !!children?.getChildsWithoutSponsorShips?.length &&
                    children?.getChildsWithoutSponsorShips?.map((child) => {
                      return (
                        <Col
                          key={child.id}
                          xs={24}
                          sm={12}
                          xl={8}
                          className="aboutCard"
                        >
                          <KidAboutCard child={child} />
                        </Col>
                      );
                    })}
                </Row>
              </div>
            </>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </div>
  );
};

export default About;
