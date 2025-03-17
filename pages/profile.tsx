import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { ReactElement } from "react";
import HomeLayout from "@/components/layouts/HomePageLayout";
import Profile from "@/components/profile";
export default function ProfilePage() {
  return <Profile />;
}
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, [
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

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navbarStatic={true}>{page}</HomeLayout>;
};
