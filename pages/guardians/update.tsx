import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";
import HomeLayout from "@/components/layouts/HomePageLayout";
import UpdateForm from "@/components/guardians/updateForm";

export default function UpdateGuardianPage() {
  return <UpdateForm />;
}
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, [
    "children",
    "common",
    "messages",
    "footer"
  ]);
  return {
    props: {
      ...locales,
    },
  };
}

UpdateGuardianPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navbarStatic={true}>{page}</HomeLayout>;
};
