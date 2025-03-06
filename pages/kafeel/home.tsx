import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";
import HomeLayout from "@/components/layouts/HomePageLayout";
import ChildCertificate from "@/components/children/ChildCertificate";
import SponsoredChilds from "@/components/children/sponsoredChilds";
import { Col, Row } from "antd";
import { useTranslation } from "next-i18next";

export default function Home() {
  const { t: translate } = useTranslation();

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <div className="container h-full">
        <div className="px-6 py-8">
          <h1 className="mb-3 text-[32px] font-[600] text-[#212121]">
            {translate("children:PARTICIPATIONS")}{" "}
          </h1>
          <Row>
            <Col xs={24} xl={15}>
              <ChildCertificate />
            </Col>
            <Col xs={24} xl={9}>
              <SponsoredChilds />
            </Col>
          </Row>
        </div>
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

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout navbarStatic={true}>{page}</HomeLayout>;
};
