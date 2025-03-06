import "@/styles/globals.css";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ReactElement,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import client from "@/helpers/client";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import AuthContextProvider, { useAuth } from "@/contexts/AuthContext";
import { UserType } from "@/types/user";
import App from "next/app";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/helpers/auth/session";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { NextPage } from "next";
import { appWithTranslation, useTranslation } from "next-i18next";
import StorageConstants from "@/helpers/storageConstants";
import { getFromStorage } from "@/helpers/storageHelper";
import { ConfigProvider, Input } from "antd";
import ar from "antd/locale/ar_EG";
import en from "antd/locale/en_US";
import theme from "@/helpers/antTheme";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Html } from "next/document";
import KafeelContextProvider from "@/contexts/KafeelContext";

type AppOwnProps = {
  token?: string;
  SSRUser?: UserType | null;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps &
  AppOwnProps & {
    Component: NextPageWithLayout;
  };

const MyApp = ({
  Component,
  pageProps,
  token = undefined,
  SSRUser = undefined,
}: AppPropsWithLayout) => {
  const { i18n, t: translate } = useTranslation();
  const [lang, setLang] = useState<string | null>(null);
  const { replace, asPath } = useRouter();

  const [queryClient] = useState(() => new QueryClient());
  // const { user } = useAuth();
  const router = useRouter();
  const [showComponents, setShowComponents] = useState<boolean>(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    const pagePath = router?.pathname;
    if (body && pagePath != "/") {
      body.style.paddingTop = "0px";
    }
  }, [router]);

  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  useEffect(() => {
    NProgress.configure({
      showSpinner: true,
      easing: "ease",
      speed: 1000,
    });
    NProgress.start();
    setShowComponents(true);
  }, [router]);

  useEffect(() => {
    NProgress.done();

    const handleRouteChangeComplete = () => {
      NProgress.done();
    };

    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return;

    () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  //

  const getDirection = (lng: string) => {
    if (lng === "ar") {
      return "rtl";
    }
    return "ltr";
  };

  useEffect(() => {
    const savedLang = getFromStorage(StorageConstants.LOCALE);
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      // moment.locale(savedLang);
      replace(asPath, asPath, { locale: savedLang });
      setLang(savedLang);
      // moment.locale('en');
    } else {
      setLang("ar");
      // moment.locale('ar');
    }
  }, []);

  useEffect(() => {
    if (lang === "ar") {
      // moment.locale('ar');
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      // moment.locale('en');
    }
  }, [lang]);

  // * Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={lang === "en" ? en : ar}
        direction={lang === "en" ? "ltr" : "rtl"}
        theme={theme}
      >
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link rel="icon" href="/favicon.ico" />
          <title>{translate("WEBSITE_TITLE")}</title>
        </Head>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthContextProvider SSRUser={SSRUser}>
            <KafeelContextProvider>
              {showComponents &&
                getLayout(
                  <Component dir={getDirection(lang || "ar")} {...pageProps} />
                )}
              {!showComponents && (
                <div className="fixed left-0 top-0 h-full w-full"></div>
              )}
            </KafeelContextProvider>
          </AuthContextProvider>
        </Hydrate>
      </ConfigProvider>
      <ToastContainer newestOnTop position={"top-left"} rtl={true} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);
  if (context.ctx.req && context.ctx.res) {
    const session = await getIronSession(
      context.ctx.req,
      context.ctx.res,
      sessionOptions
    );
    return { ...ctx, token: session.token, SSRUser: session.user };
  }

  return { ...ctx, token: undefined, SSRUser: undefined };
};

export default appWithTranslation(MyApp);
export async function getServerSideProps({ locale }: { locale: string }) {
  const locales = await serverSideTranslations(locale, ["home", "common"]);
  return {
    props: {
      ...locales,
    },
  };
}
