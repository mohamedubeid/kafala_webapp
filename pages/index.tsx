import Image from "next/image";
import { Inter } from "next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import WithAuth from "@/components/shared/WithAuth";
import { ConfigProvider } from "antd";
import HomePage from "@/components/home";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return <HomePage />;
}
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, [
    "common",
    "home",
    "footer",
  ]);
  return {
    props: {
      ...locales,
    },
  };
}

export default WithAuth(Home);
