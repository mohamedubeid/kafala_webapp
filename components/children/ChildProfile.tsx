import useGetChild from "@/hooks/children/useGetChild";
import useChildSponsorship from "@/hooks/UseRelChildKafeel.ts/useChildSponsorship";
import { SponsershipDuration } from "@/types/enm";
import { Button, Col, Image, Modal, Row } from "antd";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSponsoredChildsIds from "@/hooks/UseRelChildKafeel.ts/useGetListOfSponsoredChildIds";
import { toast } from "react-toastify";
import { useKafeel } from "@/contexts/KafeelContext";
import { useAuth } from "@/contexts/AuthContext";
import useGetChildTotalSponsoredCost from "@/hooks/children/useGetChildTotalSponsoredCost";
import SubscriptionModal from "./subscriptionDetailsModal";
import useGetFirstSubscriptionPending from "@/hooks/children/getFirstSubscriptionPending";

const ChildProfile = () => {
  const router = useRouter();
  const { query } = router;
  const { childId } = query;
  const { data: childData } = useGetChild(Number(childId),{
    enabled: true
  });
  const { kafeel: kafeelData, getKafeel } = useKafeel();
  const { t: translate } = useTranslation();
  const { data: firstPendingRequest, refetch } = useGetFirstSubscriptionPending(
    Number(childId)
  );
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

  const { submitSponsorship, response, error, loading } = useChildSponsorship();
  const [duration, setDuration] = useState<SponsershipDuration | null>(null);
  const { data: childsIds } = useSponsoredChildsIds();
  const [numberOfTimes, setNumberOfTimes] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: getChildTotalSponsored } = useGetChildTotalSponsoredCost(
    Number(childId) || -1
  );
  const { user } = useAuth();
  const { t: translateCommon } = useTranslation("common");

  const [isSponsored, setIsSponsored] = useState(
    childData?.id !== undefined && childsIds?.data?.includes(childData.id)
  );
  const [cost, setCost] = useState(
    childData?.childSponsorShip?.minimumCost
      ? childData?.childSponsorShip?.minimumCost
      : 0
  );

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value as SponsershipDuration);
  };

  useEffect(() => {
    getKafeel();
  }, []);
  useEffect(() => {
    if (childData && childData.childSponsorShip) {
      setCost(
        childData.childSponsorShip.minimumCost
          ? childData.childSponsorShip.minimumCost
          : 0
      );
    }
  }, [childData]);

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (value <= 0) {
      toast.error(translate("children:TOAST_MESSAGES:COST_ERROE"));
    } else {
      setCost(value);
    }
  };

  const handleNumberOfTimesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    setNumberOfTimes(value);
  };

  const handleSubmit = () => {
    if (!user) {
      toast.error(translate("children:TOAST_MESSAGES:LOGIN_ERROR"));
    } else if (firstPendingRequest) {
      setDetailsModalOpen(true);
    } else if (duration && cost > 0 && childData && kafeelData) {
      submitSponsorship({
        duration,
        cost,
        child: childData,
        kafeel: kafeelData,
        numberOfTimes,
      });
    } else {
      toast.error(translate("children:TOAST_MESSAGES:FILL_INPUTS"));
    }
  };

  const handleOpenSubscriptionModal = () => {
    setDetailsModalOpen(false);
    setIsModalVisible(true);
  };
  useEffect(() => {
    if (response) {
      // setIsSponsored(true);
      toast.success(translate("children:TOAST_MESSAGES:SUCCESS"));
      if (response?.data?.id) {
        setIsModalVisible(true);
        refetch();
      }
    }
  }, [response]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  // useEffect(() => {
  //   if (childData) {
  //     setIsSponsored(
  //       childData?.id !== undefined && childsIds?.data?.includes(childData.id)
  //     );
  //   }
  // }, [childData, childsIds]);

  useEffect(() => {
    if (error) {
      toast.error(translate("children:TOAST_MESSAGES:ERROR"));
    }
  }, [error]);

  return (
    <div className="kids-list-page min-h-screen bg-kafalaLight-100">
      <div className="container h-full">
        <div className="bg-white px-6 py-8">
          <div className="kids-header mb-4 flex flex-wrap items-start justify-between gap-4 md:text-lg">
            <div className="kids-title section-title">
              {translate("children:ORPHANS_SPONSORSHIP")}
            </div>
            <div className="actions">
              <Button className="btn-action !text-kborder-kafalaPrimary h-[40px] min-w-[120px] border border-solid !border-kafalaPrimary !bg-kafalaLight text-base !text-kafalaPrimary !outline-none duration-300 hover:!bg-kafalaPrimary hover:!text-white lg:h-[50px] lg:text-lg">
                {translate("children:MORE_BTN")}
              </Button>
            </div>
          </div>
          <Row>
            <Col xs={24} xl={12}>
              <div className="kid-details-card">
                <div className="kid-header flex gap-4">
                  <div className="kid-image min-h-[250px] w-[50%] self-stretch rounded-s-2xl">
                    <Image
                      preview={false}
                      className="!h-full !w-full object-cover object-center"
                      wrapperClassName="!w-full !h-full overflow-hidden rounded-3xl"
                      src={
                        childData?.imageUrl
                          ? childData?.imageUrl
                          : "/assets/partial/kid-img.png"
                      }
                      alt="child image"
                    />
                  </div>
                  <div className="kid-main-details flex w-[50%] flex-col gap-4">
                    <div className="detail-item">
                      <div className="detail-label mb-1 text-sm text-gray-500">
                        {translate("children:NAME")}
                      </div>
                      <div className="detail-val font-semibold lg:text-lg">
                        {childData?.firstName} {childData?.fatherName || ""}{" "}
                        {childData?.familyName || ""}
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label mb-1 text-sm text-gray-500">
                        {translate("children:AGE")}
                      </div>
                      <div className="detail-val font-semibold lg:text-lg">
                        {childData?.age} {translate("children:YEARS")}
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label mb-1 text-sm text-gray-500">
                        {translate("children:SIBLINGS_COUNT")}
                      </div>
                      <div className="detail-val font-semibold lg:text-lg">
                        {childData?.childMaritalStatus?.numOfSibiling || "---"}
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label mb-1 text-sm text-gray-500">
                        {translate("children:SOCIAL_STATUS")}
                      </div>
                      <div className="detail-val font-semibold lg:text-lg">
                        {translate(
                          `children:ORPHAN.${childData?.childMaritalStatus?.orphanClassification}`
                        )}
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label mb-1 text-sm text-gray-500">
                        {translate("children:HEALTH_STATUS")}
                      </div>
                      <div className="detail-val font-semibold lg:text-lg">
                        {translate(
                          `children:${childData?.childHealthStatus?.sychologicalHealthType}`
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="kid-amount">
                  <div className="mt-4 text-lg font-semibold text-gray-500">
                    {translate("children:AMOUNT_REQUIRED")}
                  </div>
                  <div className="mt-4 font-bold">
                    {translate("children:TOTAL_AMOUNT")}:{" "}
                    <span className="text-kafalaPrimary">
                      {childData?.childSponsorShip?.minimumCost
                        ? childData?.childSponsorShip?.minimumCost
                        : "---"}{" "}
                      {translate("children:DOLLAR")}{" "}
                      {translate("children:ANNUALLY")}{" "}
                    </span>
                  </div>
                  <div className="kid-progress mt-4 flex items-center gap-2">
                    <div className="progress-bar h-[10px] w-full overflow-hidden rounded-[50px] bg-gray-400">
                      <div
                        className="progress-bar-inner h-full rounded-[50px] bg-kafalaPrimary"
                        style={{
                          width: `${Math.min(
                            ((getChildTotalSponsored?.totalCost || 0) /
                              (childData?.childSponsorShip?.minimumCost
                                ? childData?.childSponsorShip?.minimumCost
                                : 1)) *
                              100,
                            100
                          ).toFixed(2)}%`,
                        }}
                      ></div>
                    </div>
                    <div className="progress-num text-sm">
                      {" "}
                      {Math.min(
                        ((getChildTotalSponsored?.totalCost || 0) /
                          (childData?.childSponsorShip?.minimumCost || 1)) *
                          100,
                        100
                      ).toFixed(2)}
                      {""}%
                    </div>
                  </div>
                  <div className="kid-desc mt-4 leading-6 text-gray-500">
                    {childData?.description}
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} xl={12}>
              <div className="sponsorshipSection mt-5 rounded-[16px] bg-[#f3f8f8] p-5">
                <div className="header flex justify-between">
                  <h1 className="text-[20px] font-normal text-[#212121]">
                    {translate("children:SPONSOR_CHILD_NAME")}{" "}
                    {childData?.firstName +
                      " " +
                      childData?.fatherName +
                      " " +
                      childData?.familyName}
                  </h1>
                  <a
                    aria-disabled="true"
                    className="pointer-events-none cursor-not-allowed text-[16px] font-normal text-[#737373] underline"
                  >
                    {translate("children:HELP_WITHOUT_MONEY")}
                  </a>
                </div>
                <p className="my-7 text-[14px] font-normal">
                  {translate("children:SPONSORSHIP_DURATION")}
                </p>
                <div className="payment-options mb-6 flex justify-between">
                  <label className="payment-option relative flex cursor-pointer items-center text-[16px]">
                    <input
                      value={SponsershipDuration.MONTHLY}
                      type="radio"
                      name="payment"
                      // disabled={
                      //   !!getChildTotalSponsored?.totalCost &&
                      //   getChildTotalSponsored?.totalCost > 0
                      // }
                      checked={duration === SponsershipDuration.MONTHLY}
                      onChange={handleDurationChange}
                      className="hidden"
                    />
                    <span
                      className={`custom-radio relative ml-2 inline-block h-5 w-5 rounded-full border-2 border-[#006f6f] ${duration === SponsershipDuration.MONTHLY ? "bg-[#006f6f]" : "bg-transparent"}`}
                    >
                      {duration === SponsershipDuration.MONTHLY && (
                        <span className="absolute left-[50%] top-[50%] block translate-x-[-50%] translate-y-[-50%] transform text-[14px] text-white">
                          &#x2713;
                        </span>
                      )}
                    </span>
                    <span className="text-[14px] text-[#006f6f]">
                      {translate("children:MONTHLY")}
                    </span>
                  </label>
                  <label className="payment-option relative flex cursor-pointer items-center text-[16px]">
                    <input
                      value={SponsershipDuration.QUARTERLY}
                      // disabled={
                      //   !!getChildTotalSponsored?.totalCost &&
                      //   getChildTotalSponsored?.totalCost > 0
                      // }
                      type="radio"
                      name="payment"
                      checked={duration === SponsershipDuration.QUARTERLY}
                      onChange={handleDurationChange}
                      className="hidden"
                    />
                    <span
                      className={`custom-radio relative ml-2 inline-block h-5 w-5 rounded-full border-2 border-[#006f6f] ${duration === SponsershipDuration.QUARTERLY ? "bg-[#006f6f]" : "bg-transparent"}`}
                    >
                      {duration === SponsershipDuration.QUARTERLY && (
                        <span className="absolute left-[50%] top-[50%] block translate-x-[-50%] translate-y-[-50%] transform text-[14px] text-white">
                          &#x2713;
                        </span>
                      )}
                    </span>
                    <span className="text-[14px] text-[#006f6f]">
                      {translate("children:QUARTERLY")}
                    </span>
                  </label>
                  <label className="payment-option relative flex cursor-pointer items-center text-[16px]">
                    <input
                      // disabled={
                      //   !!getChildTotalSponsored?.totalCost &&
                      //   getChildTotalSponsored?.totalCost > 0
                      // }
                      value={SponsershipDuration.SEMIANNUAL}
                      type="radio"
                      name="payment"
                      checked={duration === SponsershipDuration.SEMIANNUAL}
                      onChange={handleDurationChange}
                      className="hidden"
                    />
                    <span
                      className={`custom-radio relative ml-2 inline-block h-5 w-5 rounded-full border-2 border-[#006f6f] ${duration === SponsershipDuration.SEMIANNUAL ? "bg-[#006f6f]" : "bg-transparent"}`}
                    >
                      {duration === SponsershipDuration.SEMIANNUAL && (
                        <span className="absolute left-[50%] top-[50%] block translate-x-[-50%] translate-y-[-50%] transform text-[14px] text-white">
                          &#x2713;
                        </span>
                      )}
                    </span>
                    <span className="text-[14px] text-[#006f6f]">
                      {translate("children:SEMIANNUAL")}
                    </span>
                  </label>

                  <label className="payment-option relative flex cursor-pointer items-center text-[16px]">
                    <input
                      // disabled={
                      //   !!getChildTotalSponsored?.totalCost &&
                      //   getChildTotalSponsored?.totalCost > 0
                      // }
                      value={SponsershipDuration.ANNUAL}
                      type="radio"
                      name="payment"
                      checked={duration === SponsershipDuration.ANNUAL}
                      onChange={handleDurationChange}
                      className="hidden"
                    />
                    <span
                      className={`custom-radio relative ml-2 inline-block h-5 w-5 rounded-full border-2 border-[#006f6f] ${duration === SponsershipDuration.ANNUAL ? "bg-[#006f6f]" : "bg-transparent"}`}
                    >
                      {duration === SponsershipDuration.ANNUAL && (
                        <span className="absolute left-[50%] top-[50%] block translate-x-[-50%] translate-y-[-50%] transform text-[14px] text-white">
                          &#x2713;
                        </span>
                      )}
                    </span>
                    <span className="text-[14px] text-[#006f6f]">
                      {translate("children:ANNUAL")}
                    </span>
                  </label>
                </div>
                <label className="amount-label mb-5 text-[14px] font-normal">
                  {translate("children:COST")}
                </label>
                <div className="input-wrapper mb-5 mt-5 flex justify-between rounded-lg bg-white p-3.5">
                  <input
                    // disabled={
                    //   !!getChildTotalSponsored?.totalCost &&
                    //   getChildTotalSponsored?.totalCost > 0
                    // }
                    type="number"
                    id="amount"
                    placeholder="500"
                    className="amount-input border-none outline-none"
                    value={cost}
                    onChange={handleCostChange}
                    min={1}
                  />
                  <span className="text-[14px] font-normal text-[#212121]">
                    {translate("children:DOLAR")}
                  </span>
                </div>

                <label className="amount-label mt-5text-[14px] mt-5 font-normal">
                  {translate("children:HOW_MANY_TIMES")}{" "}
                  {translate("children:HOW_MANY_TIMES_CLARIFY_MESSAGE")}
                </label>
                <div className="input-wrapper mt-5 flex justify-between rounded-lg bg-white p-3.5">
                  <input
                    // disabled={
                    //   !!getChildTotalSponsored?.totalCost &&
                    //   getChildTotalSponsored?.totalCost > 0
                    // }
                    type="number"
                    id="amount"
                    className="amount-input border-none outline-none"
                    value={numberOfTimes}
                    onChange={handleNumberOfTimesChange}
                    min={1}
                  />
                </div>

                <div className="mb-7 mt-5 w-full rounded-[31px] text-center">
                  <button
                    className={`${
                      // getChildTotalSponsored?.totalCost &&
                      // getChildTotalSponsored?.totalCost > 0
                      // ? "text-gray-700 cursor-not-allowed bg-gray-300"
                      //:
                      "bg-[#006f6f] text-white hover:border hover:border-[#006f6f] hover:bg-white hover:text-[#006f6f]"
                    } w-full rounded-[31px] px-6 py-3.5 text-2xl font-semibold`}
                    // disabled={
                    //   !!getChildTotalSponsored?.totalCost &&
                    //   getChildTotalSponsored?.totalCost > 0
                    // }
                    onClick={handleSubmit}
                  >
                    {firstPendingRequest
                      ? translateCommon("FIRST_PENDING_SUBSCRIPTION_DETAILS")
                      : translateCommon("DONATE_NOW")}
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {isDetailsModalOpen && firstPendingRequest && (
          <Modal
            title={
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "black",
                  textAlign: "center",
                  marginBottom: "30px",
                }}
              >
                تفاصيل الطلب المعلق
              </div>
            }
            visible={isDetailsModalOpen}
            onCancel={() => setDetailsModalOpen(false)}
            footer={null}
          >
            {/* Modal Content */}
            <div className="modal-section">
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginBottom: "10px",
                }}
              >
                تفاصيل الطلب
              </h1>
              <h3>
                <strong>المعرف:</strong> {firstPendingRequest.id}
              </h3>
              <h3>
                <strong>المدة:</strong> {firstPendingRequest.duration}
              </h3>
              <h3>
                <strong>التكلفة:</strong> ${firstPendingRequest.cost}
              </h3>
              <h3>
                <strong>تاريخ الانتهاء:</strong>{" "}
                {new Date(
                  firstPendingRequest.expirationDate
                ).toLocaleDateString()}
              </h3>
              <h3>
                <strong>الحالة:</strong> {firstPendingRequest.status}
              </h3>
            </div>

            <div className="modal-section mt-4">
              <button
                style={{
                  backgroundColor: "#006f6f",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleOpenSubscriptionModal}
              >
                عرض تفاصيل الاشتراك
              </button>
            </div>
          </Modal>
        )}
        <SubscriptionModal
          isVisible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            // router.push("/children/classification");
          }}
          id={
            firstPendingRequest?.id
              ? firstPendingRequest?.id
              : response?.data?.id
          }
        />
        <div className="py-8">
          <div className="kids-title section-title !mb-4 !text-lg lg:!text-xl">
            {translate("children:ABOUT_ORPHANS_SPONSORSHIP")}
          </div>
          <div className="leading-7">
            {translate("children:ABOUT_SPONSORSHIP_DESC")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildProfile;
