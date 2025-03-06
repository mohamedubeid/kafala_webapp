import { AboutChild } from "@/types/child";
import { Image } from "antd";
import moment from "moment";
import React from "react";

type KidAboutCardProps = {
  child: AboutChild;
};
const KidAboutCard = ({ child }: KidAboutCardProps) => {
  return (
    <div className="min-w-full bg-white p-6 shadow-md">
      <div className="kid-image">
        <Image
          preview={false}
          className="!h-[200px] w-full object-cover object-center"
          wrapperClassName="w-full overflow-hidden"
          src={
            child && child?.imageUrl
              ? child?.imageUrl
              : "/assets/partial/kid-img.png"
          }
          alt="child image"
        />
      </div>
      <div className="mt-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap break-keep text-lg font-bold lg:text-xl">
        {child?.name} {child?.fatherName} {child?.familyName}
      </div>
      <div className="mt-2 text-gray-500">
        {child &&
          child?.joiningDate &&
          moment(new Date(child?.joiningDate)).format("DD/MM/YYYY")}
      </div>
    </div>
  );
};

export default KidAboutCard;
