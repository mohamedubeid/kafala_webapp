import { Form, Spin, Input } from "antd";
import React, { useEffect } from "react";
import AuthHeader from "../partials/AuthHeader";
import { useTranslation } from "next-i18next";
import { useAuth } from "@/contexts/AuthContext";
import useResetPasswordFinish from "@/hooks/authentication/useResetPasswordFinish";
import { ResetPasswordType } from "@/types/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { LockFilled } from "@ant-design/icons";
import { MainButton } from "@/partial/MainButton";

const ResetPassword = () => {
  const { i18n, t: translate } = useTranslation("messages");
  const [form] = Form.useForm();
  const router = useRouter();
  const { token: accessToken } = router.query;
  const { user } = useAuth();
  const { setPasswordData, resetError, resetResponse, setToken, loading } =
    useResetPasswordFinish();

  useEffect(() => {
    if (accessToken) {
      setToken(String(accessToken));
    }
  }, [router]);

  const onSubmitPassword = (values: ResetPasswordType) => {
    setPasswordData(values);
  };

  useEffect(() => {
    if (resetResponse) {
      toast.success(translate("RESET_SUCCESS"));
      form.resetFields();
      router.push("/login");
    }
  }, [resetResponse]);

  useEffect(() => {
    if (resetError) {
      toast.error(translate(resetError));
    }
  }, [resetError]);

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return (
    <>
      <AuthHeader
        title={translate("RESET_PW_LABEL")}
        className="!text-2xl !font-bold"
      />
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmitPassword}
        className="auth-form main-form flex w-full flex-col"
      >
        <Form.Item
          name="password"
          label={translate("NEW_PW")}
          rules={[
            { required: true, message: translate("PASSWORD_ERROR") },
            {
              min: 6,
              message: translate("MIN_PW_LENGTH"),
            },
            {
              max: 12,
              message: translate("MAX_PW_LENGTH"),
            },
            {
              validator: (_, value) =>
                value
                  ? !value.includes(" ")
                    ? Promise.resolve()
                    : Promise.reject(new Error(translate("SPACES_ERROR")))
                  : Promise.reject(new Error("")),
            },
          ]}
        >
          <Input.Password
            id="reset-new-pw"
            className="form-input h-[40px] w-full"
            prefix={<LockFilled className="text-lg" />}
            placeholder={translate("NEW_PW")}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={translate("CONFIRM_NEW_PW")}
          rules={[
            { required: true, message: translate("CONFIRM_PASSWORD_ERROR") },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(translate("CONFIRM_PASSOWRD_MATCH_ERROR"))
                );
              },
            }),
          ]}
          dependencies={["password"]}
        >
          <Input.Password
            id={"reset-confirm-pw"}
            className="form-input h-[40px] w-full"
            prefix={<LockFilled className="text-lg" />}
            placeholder={translate("CONFIRM_NEW_PW")}
          />
        </Form.Item>
        <div className="flex justify-center">
          <MainButton
            onClick={() => form.submit()}
            color="primary"
            classNameList="mt-2 mx-auto !w-full"
            textClass="!font-semibold"
            text={
              loading ? <Spin className="white-spin" /> : translate("SAVE_BTN")
            }
          />
        </div>
      </Form>
    </>
  );
};

export default ResetPassword;
