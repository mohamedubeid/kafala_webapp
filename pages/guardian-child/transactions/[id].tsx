import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";
import HomeLayout from "@/components/layouts/HomePageLayout";
import UpdateForm from "@/components/guardians/updateForm";
import TransactionsList from "@/components/guardians/transactionsList";

export default function TransactionsListPage() {
  return <TransactionsList />;
}
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, [
    "children",
    "common",
    "footer"
  ]);
  return {
    props: {
      ...locales,
    },
  };
}

TransactionsListPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navbarStatic={true}>{page}</HomeLayout>;
};
