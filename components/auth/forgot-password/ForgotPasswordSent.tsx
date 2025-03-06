import { MainButton } from "@/partial/MainButton";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AuthHeader from "../partials/AuthHeader";
import { useTranslation } from "next-i18next";
import { Image } from "antd";
import { useAuth } from "@/contexts/AuthContext";

const ForgotPasswordSent = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const { query } = router;
  const { i18n, t: translate } = useTranslation("messages");

  const goToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    if (query?.email) {
      const userEmail: string = query.email as string;
      setEmail(userEmail);
    }
  }, [query, query?.email]);

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return (
    <>
      <div className="">
        <Image
          src="/assets/auth/sent-success.svg"
          alt=""
          preview={false}
          className="object-scale-down"
        />
      </div>
      <AuthHeader
        warpperClassName="!mt-2"
        title={translate("RESET_PAGE_TITLE")}
        className="!text-2xl !font-bold"
      />
      <span className="text-start">
        {translate("RESET_PW_MAIL_SENT_LABEL")}{" "}
        <div className="">
          <span className="text-wrap break-all text-start font-bold text-kafalaPrimary">
            {email}
          </span>{" "}
          <span className="">{translate("RESET_LINK_LABEL")}</span>
        </div>
      </span>

      <MainButton
        onClick={goToHome}
        classNameList="mt-2 mx-auto !w-full"
        textClass="!font-semibold"
        color="primary"
        text={translate("HOMEPAGE")}
      />
    </>
  );
};

export default ForgotPasswordSent;
