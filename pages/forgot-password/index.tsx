import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { ReactElement } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import ForgotPassword from "@/components/auth/forgot-password";

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, ["common", "messages"]);
  return {
    props: {
      ...locales,
    },
  };
}

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
