import React, { useEffect, useState } from "react";
import AuthHeader from "../partials/AuthHeader";
import { Form, Input, Select, Spin } from "antd";
import Icon, { MailFilled, LockFilled } from "@ant-design/icons";

import { UserType } from "@/types/user";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import useStoreUser from "@/hooks/users/store";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authoritiesList } from "@/constants/authoritiesList";
import { MainButton } from "@/partial/MainButton";
import useActivateAccount from "@/hooks/authentication/useActivateAccount";

const Login = () => {
  const [form] = Form.useForm();
  const { setToken, activationResponse, activationError } =
    useActivateAccount();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { login, setAuthModalVisiablity, user, loading } = useAuth();
  const router = useRouter();
  const { t: translate } = useTranslation("messages");
  useEffect(() => {
    if (router.query.token) {
      setToken(String(router.query.token));
    }
  }, [router]);

  useEffect(() => {
    if (activationResponse) {
      setAuthModalVisiablity(true);
      toast(translate("REGISTER_ACTIVATION"), {
        type: "success",
        position: "top-center",
      });
    }
  }, [activationResponse]);

  useEffect(() => {
    if (activationError) {
      setAuthModalVisiablity(true);
      toast(translate(activationError), {
        type: "error",
        autoClose: 3000,
      });
    }
  }, [activationError]);

  useEffect(() => {
    if (user) {
      if (user.authorities?.includes("ROLE_GUARANTOR")) {
        if (user?.activated) {
          router.push("/");
        }
      } else {
        toast.warning(translate("NO_ACCESS_WARNING"));
      }
    }
  }, [user]);

  const handleSubmit = (values: { email: string; password: string }) => {
    if (login) {
      login(
        {
          email: values.email,
          password: values.password,
          rememberMe,
        },
        form
      );
    }
  };

  return (
    <>
      <AuthHeader title={translate("LOGIN_TITLE")} />
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        form={form}
        className="login-form auth-form flex w-full flex-col"
        id="login-form"
        initialValues={{
          authorities: [
            authoritiesList?.find((auth) => auth?.value === "ROLE_GUARANTOR")
              ?.value || "ROLE_GUARANTOR",
          ],
        }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: translate("EMAIL_ERROR") }]}
          label={translate("LOGIN_EMAIL")}
        >
          <Input
            id={"login-email"}
            className="form-input h-[40px] w-full"
            prefix={<MailFilled className="text-lg" />}
            placeholder={translate("LOGIN_EMAIL")}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={translate("LOGIN_PASSWORD")}
          rules={[
            { required: true, message: translate("PASSWORD_ERROR") },
            {
              max: 12,
              message: translate("MAX_PW_LENGTH"),
            },
          ]}
        >
          <Input.Password
            id={"login-pw"}
            className="form-input h-[40px] w-full"
            prefix={<LockFilled className="text-lg" />}
            placeholder={translate("LOGIN_PASSWORD")}
          />
        </Form.Item>
        <Link
          href={"/forgot-password"}
          className="my-2 ms-auto text-sm text-kafalaBlue underline decoration-kafalaBlue duration-500 hover:text-kafalaPrimary"
        >
          {translate("FORGET_PASSWORD")}
        </Link>

        <div className="flex flex-col items-start">
          <MainButton
            onClick={() => form.submit()}
            classNameList="mt-2 mx-auto !w-full"
            textClass="!font-semibold"
            color="primary"
            text={
              loading ? <Spin className="white-spin" /> : translate("LOGIN")
            }
          />
          <div className="form-footer mt-4 flex items-center justify-center gap-1 text-sm">
            <span className="text-black">
              {translate("DONT_HAVE_AN_ACCOUNT")}
            </span>
            <Link
              href={"/signup"}
              className="text-sm font-bold text-kafalaBlue duration-500 hover:text-kafalaPrimary"
            >
              {translate("CREATE_NEW_ACCOUNT")}
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Login;
