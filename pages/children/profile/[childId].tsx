import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { ReactElement } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import HomeLayout from "@/components/layouts/HomePageLayout";
import ChildProfile from "@/components/children/ChildProfile";

export default function ChildrenListPage() {
  return <ChildProfile />;
}
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, [
    "children",
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

ChildrenListPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navbarStatic={true}>{page}</HomeLayout>;
};
