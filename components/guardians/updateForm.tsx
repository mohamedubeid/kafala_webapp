import React from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { useTranslation } from "next-i18next";

const UpdateForm = () => {
  const { t: translateCommon } = useTranslation("common");


  return (
    <section className="main-sections">
      <div className="container">
        <div className="kids-header flex flex-wrap items-start justify-between gap-3 md:text-lg">
          <div className="kids-title section-title">
            {translateCommon("YOUR_GUARDIANS")} Form
          </div>
        </div>


      </div>
    </section>
  );
};

export default UpdateForm;
