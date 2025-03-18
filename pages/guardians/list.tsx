import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";
import HomeLayout from "@/components/layouts/HomePageLayout";
import GuardiansList from "@/components/guardians";

export default function GuardiansListPage() {
  return <GuardiansList />;
}
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, [
    "common",
    "footer"
  ]);
  return {
    props: {
      ...locales,
    },
  };
}

GuardiansListPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navbarStatic={true}>{page}</HomeLayout>;
};
