import useSponsoredChildsIds from "@/hooks/UseRelChildKafeel.ts/useGetListOfSponsoredChildIds";
import { ChildDTO } from "@/types/child";
import { Button, Image } from "antd";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

type KidCardProps = {
  kid: ChildDTO;
};

const KidCard = ({ kid }: KidCardProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation("home");
  const { t: translateCommon } = useTranslation("common");
  const { data: childsIds } = useSponsoredChildsIds();

  const goToChild = (id?: number) => {
    router.push(`/children/profile/${id}`);
  };

  const isSponsored =
    kid?.id !== undefined && childsIds?.data?.includes(kid.id);

  return (
    <div className="kidCard flex h-full flex-col gap-3 rounded-3xl p-4 shadow-gray-200 duration-300 hover:shadow-lg">
      <div className="kid-image">
        <Image
          preview={false}
          className="!h-full !w-full object-cover object-center"
          wrapperClassName="w-full !h-[230px] h-full overflow-hidden rounded-3xl"
          src={kid?.imageUrl ? kid?.imageUrl : "/assets/partial/kid-img.png"}
          alt="child image"
        />
      </div>
      {kid?.childSponsorShip?.relSponsershipTypes &&
      kid?.childSponsorShip?.relSponsershipTypes.length &&
      kid?.childSponsorShip?.relSponsershipTypes?.[0]?.sponsershipType?.type ? (
        <div className="guarantee-list flex flex-wrap gap-3">
          {kid?.childSponsorShip?.relSponsershipTypes.map((type) => {
            if (type?.sponsershipType?.type)
              return (
                <div className="guarantee-item rounded-[50px] bg-kafalaPrimary-200 p-2 text-xs font-medium !text-kafalaPrimary">
                  {translateCommon(type?.sponsershipType?.type)}
                </div>
              );
          })}
        </div>
      ) : (
        <div className="guarantee-list flex flex-wrap gap-3">
          <div className="guarantee-item rounded-[50px] bg-kafalaPrimary-200 p-2 text-xs font-medium !text-kafalaPrimary">
            {translateCommon("OTHER")}
          </div>
        </div>
      )}

      <div className="kid-details flex flex-wrap justify-between gap-3">
        <div className="">
          <div className="name font-bold">
            {kid?.firstName} {kid?.fatherName || ""} {kid?.familyName || ""}
          </div>
          <div className="address mt-1 text-sm !text-gray-300">
            {kid?.address}
          </div>
        </div>
        <div className="text-end">
          <div className="annual-warranty text-xs font-bold">
            {translate("ANNUAL_LABEL")} :
          </div>
          <div className="amount mt-1 text-lg font-bold text-kafalaPrimary">
            {kid.childSponsorShip?.minimumCost
              ? kid.childSponsorShip?.minimumCost
              : 0}
            $
          </div>
        </div>
      </div>
      <div className="kid-desc h-[80px] overflow-auto text-sm">
        {kid?.description}
      </div>
      <div className="mt-auto">
        <div className="kid-progress flex items-center gap-2">
          <div className="progress-bar h-[10px] w-full overflow-hidden rounded-[50px] bg-gray-400">
            <div
              className="progress-bar-inner h-full rounded-[50px] bg-kafalaPrimary"
              style={{
                width: `${Math.min(
                  ((kid.totalCost || 0) /
                    (kid.childSponsorShip?.minimumCost
                      ? kid.childSponsorShip?.minimumCost
                      : 1)) *
                    100,
                  100
                ).toFixed(2)}%`,
              }}
            ></div>
          </div>
          <div className="progress-num text-sm">
            {Math.min(
              (kid.totalCost || 0) /
                (kid.childSponsorShip?.minimumCost
                  ? kid.childSponsorShip?.minimumCost
                  : 1),
              100
            ).toFixed(2)}
            {""}%
          </div>
        </div>
        <div className="remaining-amount flex items-center gap-2">
          <span className="inline-block text-xs font-bold">
            {translate("REMAINING_AMOUNT")} :
          </span>
          <span className="inline-block !text-sm font-bold text-kafalaPrimary">
            {(kid.childSponsorShip?.minimumCost
              ? kid.childSponsorShip?.minimumCost
              : 1) -
              (kid.totalCost || 0) >
            0
              ? (kid.childSponsorShip?.minimumCost
                  ? kid.childSponsorShip?.minimumCost
                  : 1) - (kid.totalCost || 0)
              : 0}
          </span>
        </div>

        <Button
          onClick={() => goToChild(kid?.id)}
          className={
            isSponsored && kid.totalCost > 0
              ? "mt-3 h-[45px] w-full rounded-full border border-solid border-gray-200 bg-gray-300 text-lg font-semibold !text-gray duration-300"
              : "mt-3 h-[45px] w-full rounded-full border border-solid border-gray-200 bg-white text-lg font-semibold !text-gray duration-300 hover:!border-kafalaPrimary-300 hover:!bg-kafalaPrimary-300"
          }
        >
          {isSponsored && kid.totalCost > 0
            ? translateCommon("ALREADY_DONATED")
            : translateCommon("DONATE_NOW")}
        </Button>
      </div>
    </div>
  );
};

export default KidCard;
