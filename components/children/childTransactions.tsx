import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "next-i18next";
import useGetChildTransactionReports from "@/hooks/children/useGetChildTransactionReports";
import { useRouter } from "next/router";

const ChildTransactions = () => {
  const router = useRouter();
  const { id } = router.query;
  const parsedId = typeof id === "string" ? parseInt(id, 10) : undefined;
  const { data: childTransactionReportsData } = useGetChildTransactionReports(parsedId ?? 0);
  const { t: translate } = useTranslation();
  return (
    <>
      {childTransactionReportsData?.length == 0 ? (
        <h1 className="mt-5 text-[20px]">
          {translate("children:NO_TRANSACTIONFOUND")}
        </h1>
      ) : (
        <Row className="w-full mb-8" gutter={[16, 16]}>
          {childTransactionReportsData?.map((report, index) => (
            <Col span={24} key={index}>
              <div className="mt-10 flex items-center space-x-5">
                <div className="ml-4 flex-shrink-0">
                  <img
                    src={
                      report.child.imageUrl
                        ? report.child.imageUrl
                        : "/assets/partial/kid-img.png"
                    }
                    alt={`${report.child.firstName} ${report.child.familyName}`}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-[20px] font-[600] text-[#212121]">
                    {`${report.child.firstName} ${report.child.fatherName}  ${report.child.familyName}`}
                  </h3>
                  <p className="text-[16px] font-[600] text-[#737373]">
                    {new Date(report.createdDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* {report.image ? ( */}
              <p className="text-[16px] text-[#737373] mt-6">
                {translate("children:amountReceived")}:{" "}
                <span className="font-[600] text-[#212121] text-nowrap">
                {report.amount_received || "0"}{translate("children:currency")}
                </span>
              </p>
              <p className="mt-4 text-[18px] font-[600] text-[#737373]">
                  {report.desceription || ""}
              </p>
              {report.image ? (
                <div className="mt-5 flex h-[470px] w-full flex-col items-center justify-center rounded-[8px] bg-[#2A4142] p-5">
                <img
                  src={report.image}
                  alt="Certificate"
                  className="mt-[45px] h-[321px] rounded-lg object-contain"
                  />
              </div>
              ): ('')}

              {report.video ? (
                <div className="mt-5 flex h-[470px] w-full flex-col items-center justify-center rounded-[8px] bg-[#2A4142] p-5">
                  <video controls>
                    <source src={report.video} type="video/mp4" />
                    <source src={report.video} type="video/webm" />
                    <source src={report.video} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ): ('')}
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ChildTransactions;
