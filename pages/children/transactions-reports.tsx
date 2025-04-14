import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";
import HomeLayout from "@/components/layouts/HomePageLayout";
import TransactionReportsList from "@/components/home/TransactionReportsList";

export default function TransactionReportsPage() {
  return <TransactionReportsList />;
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

TransactionReportsPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navbarStatic={true}>{page}</HomeLayout>;
};
