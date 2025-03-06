import React, { ReactElement } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AuthLayout from "@/components/layouts/AuthLayout";
import ForgotPasswordSent from "@/components/auth/forgot-password/ForgotPasswordSent";

const ForgotPasswordSentPage = () => {
  return <ForgotPasswordSent />;
};
export default ForgotPasswordSentPage;

export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, ["common", "messages"]);
  return {
    props: {
      ...locales,
    },
  };
}
ForgotPasswordSentPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
