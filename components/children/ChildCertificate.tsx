import { Col, Row } from "antd";
import React from "react";
import useGetChildParticipations from "@/hooks/children/useGetChildsParticipations";
import { useTranslation } from "next-i18next";

const ChildCertificate = () => {
  const { data: childParticipationData } = useGetChildParticipations();
  const { t: translate } = useTranslation();
  return (
    <>
      {childParticipationData?.length == 0 ? (
        <h1 className="mt-5 text-[20px]">
          {translate("children:NO_PARTICIPATIONFOUND")}
        </h1>
      ) : (
        <Row>
          {childParticipationData?.map((child, index) => (
            <Col span={24} key={index}>
              <div className="mt-10 flex items-center space-x-5">
                <div className="ml-4 flex-shrink-0">
                  <img
                    src={
                      child.imageUrl
                        ? child.imageUrl
                        : "/assets/partial/kid-img.png"
                    }
                    alt={`${child.firstName} ${child.familyName}`}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-[20px] font-[600] text-[#212121]">
                    {`${child.firstName} ${child.fatherName}  ${child.familyName}`}
                  </h3>
                  <p className="text-[16px] font-[600] text-[#737373]">
                    {new Date(child.createdDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {child.certificateImage ? (
                <div className="mt-5 flex h-[470px] w-full flex-col items-center justify-center rounded-[8px] bg-[#2A4142] p-5">
                  <img
                    src={child.certificateImage}
                    alt="Certificate"
                    className="mt-[45px] h-[321px] rounded-lg object-contain"
                  />
                  <p className="mt-4 text-[18px] font-[600] text-[#FFFFFF]">
                    {child.description || ""}
                  </p>
                </div>
              ) : (
                <p className="mr-[70px] mt-4 text-[18px] font-[600] text-[#737373]">
                  {child.description || ""}
                </p>
              )}
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ChildCertificate;
