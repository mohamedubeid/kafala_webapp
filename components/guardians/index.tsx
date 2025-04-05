import React from "react";
import { Button, Col, Row } from "antd";
import Link from "next/link";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useGetGuardianChilds from "@/hooks/children/getGuardianChilds";

const GuardiansList = () => {
  const { t: translate } = useTranslation();
  const { data: guardianChilds } = useGetGuardianChilds();
  const router = useRouter();

  return (
    <section className="main-sections">
      <div className="container">
        <div className="kids-header flex flex-wrap items-start justify-between items-center gap-3 md:text-lg mb-12">
          <div className="kids-title section-title mb-0">
            {translate("children:guardianshipChildren")}
          </div>
          <Button
              className="h-[45px] w-[200px] rounded-full border border-solid border-kafalaPrimary bg-kafalaPrimary text-lg !text-white duration-300 hover:!border-kafalaPrimary-400 hover:!bg-kafalaPrimary-400"
              onClick={() => {
                router.push("/guardian-child/new");
              }}
            >
              {translate("children:ADD_CHILD")}
          </Button>
        </div>

      <Row className="w-full mt-4" gutter={[16, 16]}>
          {guardianChilds?.length === 0 ? (
          <Col span={24}>
            <h1 className="mt-5 text-[20px] xl:mx-20 xl:mt-8">
              {translate("children:noChildrenFound")}
            </h1>
          </Col>
          ) : (
            guardianChilds?.map((guardianChild, index) => {
              return (
                <Col key={index} xs={24} md={12}>
                  <div 
                    className="mb-2 w-full rounded-[16px] bg-[#F3F8F8] p-5 transition-colors duration-400 hover:bg-[#E0F7FA] cursor-pointer"
                    onClick={() => router.push(`/guardian-child/${guardianChild.id}/update`)}
                  >
                    <div className="flex flex-col lg:flex-row items-center gap-y-4">
                      <div className="w-full lg:w-auto flex justify-between items-center">
                        <div className="ml-8 flex-shrink-0">
                          <img
                            src={
                              guardianChild.imageUrl
                                ? guardianChild.imageUrl
                                : "/assets/partial/kid-img.png"
                            }
                            className="h-[56px] w-[56px] rounded-full object-cover"
                          />
                        </div>
                        <div className="block lg:hidden">
                          <Button
                            className="h-[42px] w-[110px] rounded-[22px] border-none bg-kafalaPrimary text-[14px] font-[600] !text-white duration-300  hover:!bg-kafalaPrimary-400"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/guardian-child/transactions/${guardianChild.id}`);
                            }}
                            >
                            {translate("children:transactions")}
                          </Button>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <div>
                          <h3 className="text-[20px] font-[600] text-[#212121]">
                            {guardianChild.firstName}{" "}
                            {guardianChild.fatherName}{" "}
                            {guardianChild.familyName}
                          </h3>
                          <div className="flex flex-row flex-wrap gap-x-3 gap-y-1">
                            <p className="mt-1 text-[16px] font-[600] text-[#737373]">
                            {translate("messages:gender")}:{" "}
                              {translate(`messages:${guardianChild.gender?.toLowerCase()}`) ?? 'N/A'}
                            </p>
                            <p className="mt-1 text-[16px] font-[600] text-[#737373]">
                            {translate("messages:age")}:{" "}
                              {guardianChild.age}
                            </p>
                            <p className="mt-1 text-[16px] font-[600] text-[#737373]">
                            {translate("messages:OrphanClassification")}:{" "}
                            {guardianChild?.childMaritalStatus?.orphanClassification ? translate(`messages:${guardianChild?.childMaritalStatus?.orphanClassification}`) : '...'}
                            </p>
                          </div>
                        </div>
                        <div className="hidden lg:block">
                        <Button
                          className="h-[42px] w-[110px] rounded-[22px] border-none bg-kafalaPrimary text-[14px] font-[600] !text-white duration-300 hover:!bg-kafalaPrimary-400 z-[10] relative"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the click event from propagating to the parent <Link>
                            router.push(`/guardian-child/transactions/${guardianChild.id}`);
                          }}
                        >
                          {translate("children:transactions")}
                        </Button>
                        </div>
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

export default GuardiansList;
