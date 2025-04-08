import { Button, Col, Row } from "antd";
import React from "react";
import { useTranslation } from "next-i18next";
import useGetSponsoredChildren from "@/hooks/children/getSponsoredChilds";
import { useRouter } from "next/router";

const SponsoredChilds = () => {
  const { t: translate } = useTranslation();
  const { data: sponsoredChilds } = useGetSponsoredChildren();
  const router = useRouter();
  const today = new Date();
  return (
    <>
      <Row className="w-full mt-4 mb-8" gutter={[16, 16]}>
          {sponsoredChilds?.length === 0 ? (
            <Col span={24}>
              <h1 className="mt-5 text-[20px] xl:mx-20 xl:mt-8">
                {translate("children:noChildrenFound")}
              </h1>
            </Col>
          ) : (
              sponsoredChilds?.map((childSponsored, index) => {
                const expirationDate = new Date(childSponsored.expirationDate);
                const isExpired = today > expirationDate;

                return (
                  <Col key={index} xs={24}>
                    <div
                      key={index}
                      className="mb-2 w-full rounded-[16px] bg-[#F3F8F8] hover:bg-[#e5e5e5] p-8 transition-colors duration-600"
                    >
                      <div className="flex flex-col w-full justify-between md:flex-row gap-y-4">
                        <div className="flex sm:w-full md:w-auto items-center justify-between">
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
                          <div className="block md:hidden">
                            <Button
                              className="h-[42px] w-[110px] rounded-[22px] border-none bg-[#0B7275] px-[22px] py-[8px] text-[14px] font-[600] text-[#ffffff] transition-colors duration-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/kafeel/${childSponsored.childId}/transactions`);
                              }}
                            >
                              {translate("children:transactionReports")}
                            </Button>
                          </div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                          <div>
                            <h3 className="text-[20px] font-[600] text-[#212121]">
                              {childSponsored.firstName}{" "}
                              {childSponsored.fatherName}{" "}
                              {childSponsored.familyName}
                            </h3>
                          </div>
                          {true && (
                            <div className="hidden md:block">
                              <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/kafeel/${childSponsored.childId}/transactions`);
                              }}
                                className="h-[46px] w-[130px] rounded-[22px] border-none bg-[#0B7275] px-[22px] py-[8px] text-[14px] font-[600] text-[#ffffff] transition-colors hover:!bg-kafalaPrimary-400 duration-200 !text-white"
                              >
                                {translate("children:transactionReports")}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-8 grid grid-cols-2 gap-8">
                        <div>
                          <p className="text-[16px] text-[#737373]">
                            {translate("children:startDate")}:{" "}
                            <span className="font-[600] text-[#212121] text-nowrap">
                            {new Date(childSponsored.startDate).toLocaleDateString("en-GB")}
                            </span>
                          </p>
                        </div>
                        <div>
                        <p className="text-[16px] text-[#737373]">
                          {translate("children:expirationDate")}:{" "}
                          <span
                            className={`font-[600] text-nowrap ${
                              isExpired ? "text-red-500" : "text-[#212121]"
                            }`}
                          >
                            {new Date(childSponsored.expirationDate).toLocaleDateString("en-GB")}
                          </span>
                        </p>
                        </div>
                        <div>
                          <p className="text-[16px] text-[#737373]">
                            {translate("children:cost")}:{" "}
                            <span className="font-[600] text-[#212121] text-nowrap">
                            {childSponsored.cost || "0"}{translate("children:currency")}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[16px] text-[#737373]">
                            {translate("children:duration")}:{" "}
                            <span className="font-[600] text-[#212121] text-nowrap">
                            {childSponsored.duration ? translate(`children:${childSponsored.duration}`) : translate("children:N/A")}
                            </span>
                          </p>
                        </div>
                      </div>

                    </div>
                  </Col>
                );
              })
          )}
      </Row>
    </>
  );
};

export default SponsoredChilds;
