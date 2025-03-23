import React from "react";
import { Button, Col, Row } from "antd";
import Link from "next/link";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import useGetSponsoredChildren from "@/hooks/children/getSponsoredChilds";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const GuardiansList = () => {
  const { t: translate } = useTranslation();
  const { data: sponsoredChilds } = useGetSponsoredChildren();
  const today = new Date();
  const router = useRouter();



  return (
    <section className="main-sections">
      <div className="container">
        <div className="kids-header flex flex-wrap items-start justify-between gap-3 md:text-lg">
          <div className="kids-title section-title">
            {translate("children:guardianshipChildren")}
          </div>
          <Button
              className="mt-7 h-[45px] w-[200px] rounded-full border border-solid border-kafalaPrimary bg-kafalaPrimary text-lg !text-white duration-300 hover:!border-kafalaPrimary-400 hover:!bg-kafalaPrimary-400"
              onClick={() => {
                router.push("/guardians/update");
              }}
            >
              {translate("children:ADD_CHILD")}
          </Button>
        </div>


      <Row className="w-full mt-4">
        <Col>
          {sponsoredChilds?.length === 0 ? (
            <h1 className="mt-5 text-[20px] xl:mx-20 xl:mt-8">
              {translate("children:noChildrenFound")}
            </h1>
          ) : (
            <div className="mt-1 w-full rounded-[16px] bg-[#F3F8F8] p-2 xl:mx-20">
              {sponsoredChilds?.map((childSponsored, index) => {
                const expirationDate = new Date(childSponsored.expirationDate);
                const isExpired = today > expirationDate;

                return (
                  <Link href="/guardians/update">
                    <div
                      key={index}
                      className="mb-2 w-full rounded-[16px] bg-[#F3F8F8] p-5"
                    >
                      <div className="flex items-center">
                        <div className="ml-8 flex-shrink-0">
                          <img
                            src={
                              childSponsored.imageUrl
                                ? childSponsored.imageUrl
                                : "/assets/partial/kid-img.png"
                            }
                            className="h-[56px] w-[56px] rounded-full object-cover"
                          />
                        </div>
                        <div className="flex w-full items-center justify-between">
                          <div>
                            <h3 className="text-[20px] font-[600] text-[#212121]">
                              {childSponsored.firstName}{" "}
                              {childSponsored.fatherName}{" "}
                              {childSponsored.familyName}
                            </h3>
                            <p
                              className={`mt-1 text-[16px] font-[600] ${
                                isExpired ? "text-[#C62828]" : "text-[#737373]"
                              }`}
                            >
                              {translate("children:sponsorshipFinished")}:{" "}
                              {expirationDate.toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}{" "}
                            </p>
                          </div>
                          {isExpired && (
                            <div>
                              <Button
                                disabled={true}
                                className="h-[42px] w-[110px] rounded-[22px] border-none bg-[#0B7275] px-[22px] py-[8px] text-[14px] font-[600] text-[#ffffff] transition-colors duration-200"
                              >
                                {translate("children:renewSponsorship")}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Col>
      </Row>
      


      </div>
    </section>
  );
};

export default GuardiansList;
