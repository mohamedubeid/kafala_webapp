import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";
import HomeLayout from "@/components/layouts/HomePageLayout";
import ChildCertificate from "@/components/children/ChildCertificate";
import { useTranslation } from "next-i18next";
import ChildTransactions from "@/components/children/childTransactions";
import { Col, Row } from "antd";

export default function TransactionReports() {
  const { t: translate } = useTranslation();

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <div className="container h-full">
        <div className="px-6 pt-8">
          <h1 className="text-[32px] font-[600] text-[#212121]">
            {translate("children:transactionReports")}{" "}
          </h1>
        </div>
        <Row>
          <Col xs={24} xl={15}>
            <ChildTransactions />
          </Col>
        </Row>
      </div>
    </div>
  );
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

TransactionReports.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navbarStatic={true}>{page}</HomeLayout>;
};
