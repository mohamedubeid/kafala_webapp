import { Button, Col, Row } from "antd";
import React from "react";
import { useTranslation } from "next-i18next";
import useGetSponsoredChildren from "@/hooks/children/getSponsoredChilds";
import { useRouter } from "next/router";
import { ChildSponsoredDTO } from "@/types/childSponsored";

const SponsoredChilds = () => {
  const { t: translate } = useTranslation();
  const { data: sponsoredChilds } = useGetSponsoredChildren();
  const groupedChildren = sponsoredChilds?.reduce((acc, child) => {
    const existing = acc.find(item => item.child.childId === child.childId);
    if (existing) {
      existing.sponsoredData.push(child);
    } else {
      const { firstName, fatherName, familyName, imageUrl, childId } = child;
      acc.push({
        child: { firstName, fatherName, familyName, imageUrl, childId },
        sponsoredData: [child]
      });
    }
    return acc;
  }, [] as { child: Partial<ChildSponsoredDTO>; sponsoredData: ChildSponsoredDTO[] }[]);
  const router = useRouter();
  const today = new Date();
  return (
    <>
      <Row className="w-full mt-4 mb-8" gutter={[16, 16]}>
      {groupedChildren?.length === 0 ? (
        <Col span={24}>
          <h1 className="mt-5 text-[20px] xl:mx-20 xl:mt-8">
            {translate("children:noChildrenFound")}
          </h1>
        </Col>
        ) : (
          groupedChildren?.map(({ child, sponsoredData }, index) => {
            return (
              <Col key={index} xs={24}>
                <div className="mb-2 w-full rounded-[16px] bg-[#F3F8F8] hover:bg-[#e5e5e5] p-8 transition-colors duration-600">
                  <div className="flex flex-col w-full justify-between md:flex-row gap-y-4">
                    <div className="flex sm:w-full md:w-auto items-center justify-between">
                      <div className="ml-8 flex-shrink-0">
                        <img
                          src={child.imageUrl || "/assets/partial/kid-img.png"}
                          className="h-[56px] w-[56px] rounded-full object-cover"
                        />
                      </div>
                      <div className="block md:hidden">
                        <Button
                          className="h-[42px] w-[110px] rounded-[22px] border-none bg-[#0B7275] px-[22px] py-[8px] text-[14px] font-[600] text-[#ffffff] transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/kafeel/${child.childId}/transactions`);
                          }}
                        >
                          {translate("children:transactionReports")}
                        </Button>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <div>
                        <h3 className="text-[20px] font-[600] text-[#212121]">
                          {child.firstName} {child.fatherName} {child.familyName}
                        </h3>
                      </div>
                      <div className="hidden md:block">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/kafeel/${child.childId}/transactions`);
                          }}
                          className="h-[46px] w-[130px] rounded-[22px] border-none bg-[#0B7275] px-[22px] py-[8px] text-[14px] font-[600] text-[#ffffff] transition-colors hover:!bg-kafalaPrimary-400 duration-200 !text-white"
                        >
                          {translate("children:transactionReports")}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {sponsoredData.map((s, idx) => {
                    const expirationDate = new Date(s.expirationDate);
                    const isExpired = new Date() > expirationDate;

                    return (
                      <div key={idx} className="mt-8 grid grid-cols-2 gap-8" id="childSponsoredInfo">
                        <div>
                          <p className="text-[16px] text-[#737373]">
                            {translate("children:startDate")}:{" "}
                            <span className="font-[600] text-[#212121] text-nowrap">
                              {new Date(s.startDate).toLocaleDateString("en-GB")}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[16px] text-[#737373]">
                            {translate("children:expirationDate")}:{" "}
                            <span className={`font-[600] text-nowrap ${isExpired ? "text-red-500" : "text-[#212121]"}`}>
                              {new Date(s.expirationDate).toLocaleDateString("en-GB")}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[16px] text-[#737373]">
                            {translate("children:cost")}:{" "}
                            <span className="font-[600] text-[#212121] text-nowrap">
                              {s.cost || "0"}{translate("children:currency")}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[16px] text-[#737373]">
                            {translate("children:duration")}:{" "}
                            <span className="font-[600] text-[#212121] text-nowrap">
                              {s.duration ? translate(`children:${s.duration}`) : translate("children:N/A")}
                            </span>
                          </p>
                        </div>
                        {idx < sponsoredData.length - 1 && (
                          <hr className="mt-6 border-t border-[#d1d1d1]" />
                        )}
                    </div>
                  );
                })}
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
