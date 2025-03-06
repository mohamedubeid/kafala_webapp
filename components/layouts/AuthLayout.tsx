import { useAuth } from "@/contexts/AuthContext";
import { MainButton } from "@/partial/MainButton";
import { Button, Image } from "antd";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

type AuthLayoutProps = {
  children: React.ReactElement;
};
const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { i18n, t: translate } = useTranslation();
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <div className="authLayoutParent relative flex min-h-screen items-center justify-center overflow-x-clip bg-auth bg-repeat">
      <div className="logout absolute inset-[20px] !bottom-[initial] top-[20px] z-[51] flex items-center justify-end gap-2 max-sm:inset-[10px] max-sm:top-[10px] lg:absolute">
        {router.pathname.includes("forgot-password") ||
        router.pathname.includes("reset-password") ? (
          <>
            {user ? (
              <MainButton
                text={translate("NAV_LOGOUT")}
                color="primary"
                classNameList="max-w-[160px] max-sm:text-sm xl:text-lg max-h-[50px]"
                onClick={() => logout()}
              />
            ) : (
              <>
                <MainButton
                  text={translate("NAV_LOGIN")}
                  color="primary"
                  classNameList="max-w-[160px] max-sm:text-sm xl:text-lg max-h-[50px]"
                  onClick={() => router.push("/login")}
                />
                <MainButton
                  text={translate("NAV_SIGNUP")}
                  color="primary-outline"
                  classNameList="max-w-[160px] max-sm:text-sm xl:text-lg max-h-[50px]"
                  onClick={() => router.push("/signup")}
                />
              </>
            )}
          </>
        ) : (
          <>
            <MainButton
              text={translate("HOME_PAGE")}
              color="primary"
              classNameList="max-w-[120px] max-sm:text-sm xl:text-lg max-h-[50px]"
              onClick={() => router.push("/")}
            />
          </>
        )}
      </div>
      <div className="fixed inset-0 top-0 hidden h-screen w-[50%] items-start md:flex">
        <Image
          preview={false}
          src={`/assets/auth/auth-bg.jpg`}
          alt="bg"
          className="!w-full! !h-full !max-h-screen max-w-full object-cover object-right"
          wrapperClassName="!w-full !h-full"
        />
      </div>

      <div className="ms-auto mt-[30px] flex w-full justify-end max-lg:mt-[50px] md:w-[50%]">
        <div className="max-auto relative z-50 mx-auto flex w-full max-w-[550px] flex-col items-start justify-center gap-2 px-10 py-4 max-md:!mx-auto max-sm:max-w-[350px] max-sm:p-2 lg:max-w-[600px] lg:gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
