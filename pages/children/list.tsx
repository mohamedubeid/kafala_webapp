import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { ReactElement } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import HomeLayout from "@/components/layouts/HomePageLayout";
import KidsList from "@/components/children";

export default function ChildrenListPage() {
  return <KidsList />;
}
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, [
    "home",
    "common",
    "children",
    "messages",
    "footer",
  ]);
  return {
    props: {
      ...locales,
    },
  };
}

ChildrenListPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navbarStatic={true}>{page}</HomeLayout>;
};
