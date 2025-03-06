import React, { useEffect, useState } from "react";

import { Form, Input, Spin } from "antd";
import { MailFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { MainButton } from "@/partial/MainButton";
import { useTranslation } from "next-i18next";
import AuthHeader from "../partials/AuthHeader";
import useResetPasswordInit from "@/hooks/authentication/useResetPasswordInit";

const ForgotPassowrd = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();
  const { setUserEmail, response, resetPasswordError, loading } =
    useResetPasswordInit();
  const role = router.query.role as string;
  const { i18n, t: translate } = useTranslation("messages");

  const onSubmitEmail = (values: { email: string }) => {
    setUserEmail(values.email);
  };

  useEffect(() => {
    if (response) {
      toast.success(translate("FORGOT_MAIL_SENT_SUCCESS"));
      form.resetFields();
      router.push({
        pathname: "/forgot-password/sent",
        query: { email },
      });
    }
  }, [response]);

  useEffect(() => {
    if (resetPasswordError) {
      toast.error(translate(resetPasswordError));
    }
  }, [resetPasswordError]);

  useEffect(() => {
    if (user && user.authorities?.includes("ROLE_GUARANTOR")) router.push("/");

    if (user) router.push("/");
  }, [user]);

  return (
    <>
      <AuthHeader
        title={translate("FORGOT_PW_TITLE")}
        className="!text-2xl !font-bold"
      />
      <span className="text-start">{translate("FORGOT_PW_DESCRIPTION")}</span>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmitEmail}
        className="auth-form main-form flex w-full flex-col"
      >
        <Form.Item
          name="email"
          label={translate("LOGIN_EMAIL")}
          rules={[{ required: true, message: translate("EMAIL_ERROR") }]}
        >
          <Input
            id={"forgot-pw"}
            onChange={(e) => setEmail(e.target.value || "")}
            className="form-input h-[40px] w-full"
            prefix={<MailFilled className="text-lg" />}
            placeholder={translate("LOGIN_EMAIL")}
          />
        </Form.Item>
        <div className="flex justify-end">
          <MainButton
            onClick={() => form.submit()}
            classNameList="mt-2 mx-auto !w-full"
            textClass="!font-semibold"
            color="primary"
            text={
              loading ? (
                <Spin className="white-spin" />
              ) : (
                translate("RESET_PW_BTN")
              )
            }
          />
        </div>
      </Form>
    </>
  );
};
export default ForgotPassowrd;
