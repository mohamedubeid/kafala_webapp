import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { ReactElement } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import ResetPassword from "@/components/auth/forgot-password/ResetPassword";

export default function ResetPasswordPage() {
  return <ResetPassword />;
}
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, ["common", "messages"]);
  return {
    props: {
      ...locales,
    },
  };
}

ResetPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
