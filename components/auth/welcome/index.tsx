import React, { useEffect, useState } from "react";

import { Button, Checkbox, Form, Input } from "antd";
import Icon, { MailFilled, LockFilled } from "@ant-design/icons";
import Link from "next/link";

import { useRouter } from "next/router";
import AuthHeader from "../partials/AuthHeader";
import { MainButton } from "@/partial/MainButton";
import { useTranslation } from "next-i18next";

const Welcome = () => {
  const { i18n, t: translate } = useTranslation();
  const [email, setEmail] = useState<string>("");

  const router = useRouter();
  const goToHome = () => {
    router.push("/");
  };
  useEffect(() => {
    if (router.query.email) {
      const decodedEmail = decodeURIComponent(router.query.email as string);
      setEmail(decodedEmail);
    }
  }, [router, router.query, router.query.email]);
  return (
    <div>
      <AuthHeader
        title={translate("WELCOME_TITLE")}
        description={translate("VERIFY_ACCOUNT_MESSAGE")}
      />
      <div className="">
        {router.query.email && (
          <div className="text-lg">
            <div className="text-gray-300">
              {translate("VERIFY_ACCOUNT_LABEL")}
            </div>
            <div className="mt-2 text-end">{email}</div>
          </div>
        )}

        {/* <div className="text-gray-300">
          {translate("RESEND_VERIFY_MAIL_LABEL")}
        </div>
        <div className="mt-2">
          <Button className="!border-none !bg-transparent !p-0 text-base font-semibold text-kafalaPrimary-100 !shadow-none !outline-none">
            {translate("RESEND_VERIFY_MAIL")}
          </Button>
        </div> */}
      </div>

      {/* <MainButton
        onClick={goToHome}
        classNameList="mt-2 mx-auto max-w-[210px]"
        textClass="!font-semibold"
        color="primary"
        text={translate("HOMEPAGE")}
      /> */}
    </div>
  );
};
export default Welcome;
