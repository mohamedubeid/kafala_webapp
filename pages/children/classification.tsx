import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";
import HomeLayout from "@/components/layouts/HomePageLayout";
import Kids from "@/components/home/Kids";

export default function ChildrenClassificationPage() {
  return <Kids />;
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

ChildrenClassificationPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navbarStatic={true}>{page}</HomeLayout>;
};
