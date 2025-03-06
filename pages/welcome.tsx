import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import SignUp from "@/components/auth/signup";
import { ReactElement } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import Welcome from "@/components/auth/welcome";

export default function WelcomePage() {
  return <Welcome />;
}
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, ["common", "messages"]);
  return {
    props: {
      ...locales,
    },
  };
}

WelcomePage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
