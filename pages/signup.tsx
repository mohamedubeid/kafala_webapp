import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import SignUp from "@/components/auth/signup";
import { ReactElement } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function SignUpPage() {
  return (
    //   <Head>
    //   <title>{GLOBAL.WEBSITE_INFO.SIGNUP_TITLE}</title>
    //   <meta name="description" content={GLOBAL.WEBSITE_INFO.DESCRIPTION} />
    // </Head>
    <SignUp />
  );
}
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, ["common", "messages"]);
  return {
    props: {
      ...locales,
    },
  };
}

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
