import React, { ReactElement } from "react";

type FieldCardType = {
  icon: ReactElement;
  title: string;
  description: string;
  index: number;
};
const FieldCard = ({ icon, title, description, index }: FieldCardType) => {
  return (
    <div
      className="fields-list-item w-full md:max-w-[calc(50%-12px)]"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={200 * (index + 1)}
      data-aos-easing="ease-in-out"
      data-aos-offset="100"
    >
      <div className="fields-list-item-icon mb-4">{icon}</div>
      <div className="fields-list-item-title section-subtitle">{title}</div>
      <div className="fields-list-item-desc text-sm">{description}</div>
    </div>
  );
};

export default FieldCard;
