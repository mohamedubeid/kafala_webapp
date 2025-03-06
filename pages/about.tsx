import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { ReactElement } from "react";
import HomeLayout from "@/components/layouts/HomePageLayout";
import About from "@/components/about";

export default function AboutPage() {
  return <About />;
}
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, [
    "about",
    "common",
    "messages",
    "footer",
  ]);
  return {
    props: {
      ...locales,
    },
  };
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navbarStatic={true}>{page}</HomeLayout>;
};
