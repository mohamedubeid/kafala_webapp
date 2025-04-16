import React, { useEffect } from "react";
import { Button, Col, Row } from "antd";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useGetChildTransactions from "@/hooks/children/getChildTransactions";

const TransactionsList = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const guardianId = id && typeof id === "string" ? parseInt(id, 10) : NaN;
  const { data: childTransactions } = useGetChildTransactions(guardianId);
  useEffect(() => {
    if (childTransactions && childTransactions.length === 0) {
      router.push("/guardian-child/list");
    }
  }, [childTransactions, router]);
  return (
    <section className="main-sections">
      <div className="container">
        <div className="mb-8">
          <div className="mb-3 text-[32px] font-[600] text-[#212121]">
            {translate("children:transactions")}
          </div>
        </div>
        <div className="mb-8 flex items-center justify-between px-8">
          <div className="flex items-center gap-x-4">
            <div className="flex-shrink-0">
              <img
                src={
                  childTransactions?.[0]?.imageUrl
                    ? childTransactions[0].imageUrl
                    : "/assets/partial/kid-img.png"
                }
                alt={`${childTransactions?.[0]?.firstName || ""} ${
                  childTransactions?.[0]?.familyName || ""
                }`}
                className="h-14 w-14 rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-[20px] font-[600] text-[#212121]">
                {`${childTransactions?.[0]?.firstName || ""} ${
                  childTransactions?.[0]?.fatherName || ""
                } ${childTransactions?.[0]?.familyName || ""}`}
              </h3>
            </div>
          </div>
          <h3 className="text-[18px] font-[600] text-[#212121]">
            <span className="text-[16px] text-[#737373]">
              {translate("children:collectedUntilNow")}:{" "}
            </span>
            {childTransactions ?
              childTransactions.reduce((total, transaction) => total + (transaction.cost || 0), 0)
              : 0
            }{translate("children:currency")}
          </h3>
          <h3 className="text-[18px] font-[600] text-[#212121]">
            <span className="text-[16px] text-[#737373]">
              {translate("children:cost_yearly")}:{" "}
            </span>
            {childTransactions?.[0]?.minimumCost ?? '0'}{translate("children:currency")}
          </h3>
        </div>
        
        <Row className="w-full mt-4" gutter={[16, 16]}>
          {childTransactions && childTransactions.length === 0 ? (
            <Col span={24}>
              <h1 className="text-[20px] xl:mx-20 xl:mt-8">
                {translate("children:noTransactionsFound")}
              </h1>
            </Col>
            ) : (
              childTransactions?.map((transaction, index) => {
                return (
                  <Col key={index} xs={24} md={12}>
                    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <p className="text-[16px] font-[600] text-[#212121]">
                        {translate("children:sponsoredBy")}:{" "}
                        <span className="font-[600] text-[#212121]">
                          {`${transaction.kafeelFirstName || ""} ${
                            transaction.kafeelLastName || ""
                          }`}
                        </span>
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[14px] text-[#737373]">
                            {translate("children:startDate")}:{" "}
                            <span className="font-[600] text-[#212121]">
                              {new Date(transaction.startDate).toLocaleDateString("en-GB")}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[14px] text-[#737373]">
                            {translate("children:expirationDate")}:{" "}
                            <span className="font-[600] text-[#212121]">
                              {new Date(transaction.expirationDate).toLocaleDateString("en-GB")}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[14px] text-[#737373]">
                            {translate("children:cost")}:{" "}
                            <span className="font-[600] text-[#212121]">
                              {transaction.cost || "0"}{translate("children:currency")}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[14px] text-[#737373]">
                            {translate("children:duration")}:{" "}
                            <span className="font-[600] text-[#212121]">
                            {transaction.duration ? translate(`children:${transaction.duration}`) : translate("children:N/A")}
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
      </div>
    </section>
  );
};

export default TransactionsList;
