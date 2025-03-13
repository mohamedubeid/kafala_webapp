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
import UploadImage from "uploads/UploadImage";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar.json";
import { filteredCountries } from "@/helpers/phoneCountries";

const SignUp = () => {
  const [formRef] = Form.useForm();
  const { setUserData, storeResponse, storeError, storeLoading } = useStoreUser();
  const [selectedAuthority, setSelectedAuthority] = useState<string>(
    authoritiesList?.find((auth) => auth?.value === "ROLE_GUARANTOR")?.value || "ROLE_GUARANTOR"
  );
  const [email, setEmail] = useState<string>("");
  const { user: userData, loading } = useAuth();
  const { i18n, t: translate } = useTranslation(["messages"]);
  const [firstName, setFirstName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [attachUrl, setAttachmentUrl] = useState<{ id?: number; link?: string }[]>([]);
  const defaultCountry = "eg";

  useEffect(() => {
    formRef.setFieldValue("nationality", defaultCountry);
    formRef.setFieldValue("country", defaultCountry);
  }, []);
  const removeImageUrl = (imageIndex: number | void) => {
    const ImagesList = attachUrl;
    if (imageIndex) {
      ImagesList.splice(imageIndex - 1, 1);
    }
    setAttachmentUrl([...ImagesList]);
  };

  const [nationalId, setNationalId] = useState<string | undefined>(undefined);

  const router = useRouter();

  const onSubmit = async (values: UserType) => {
    const user: UserType = {
      ...values,
      login: values.email,
      firstName: firstName,
      mobile: mobile,
      national_id: nationalId,
      attachment: attachUrl && attachUrl?.length ? attachUrl[0]?.link || attachUrl[1]?.link || undefined : undefined,
      authorities: [selectedAuthority],
    };
    setUserData(user);
  };

  useEffect(() => {
    if (storeResponse && !storeResponse.data.uid) {
      toast(translate("REGISTER_SUCCESSFUL"), {
        type: "success",
        position: "top-center",
      });
      formRef.resetFields();
      router.push(`/welcome?email=${email}`);
    }
  }, [storeResponse, formRef]);

  useEffect(() => {
    if (storeResponse && storeResponse.data.uid) {
      toast(translate("REGISTER_SUCCESSFUL"), {
        type: "success",
        position: "top-center",
      });
    }
  }, [storeResponse]);
  useEffect(() => {
    if (storeError) {
      if (storeError.statusCode === 400) {
        switch (storeError.message) {
          case "error.mobileexists":
            toast(translate("MOBILE_EXISTS"), {
              type: "error",
              position: "top-left",
            });
            break;
          case "error.emailexists":
            toast(translate("EMAIL_EXISTS"), {
              type: "error",
              position: "top-left",
            });
            break;
          case "error.nationalIdExists":
            toast(translate("nationalIdExists"), {
              type: "error",
              position: "top-left",
            });
            break;
          default:
            toast(translate("BAD_REQUEST"), {
              type: "error",
              position: "top-left",
            });
            break;
        }
      } else {
        toast(translate("BAD_REQUEST"), {
          type: "error",
          position: "top-left",
        });
      }
    }
  }, [storeError]);

  useEffect(() => {
    if (userData && !userData?.activated) {
      router.push(`/welcome?email=${email}`);
    } else if (userData) {
      router.push("/");
    }
  }, [userData, userData?.id]);

  return (
    <>
      <AuthHeader title={translate("SIGNUP_TITLE")} />
      <Form
        onFinish={onSubmit}
        layout="vertical"
        form={formRef}
        className="sign-up-form auth-form flex w-full flex-col"
        id="signup-form"
      >
        <Form.Item
          name="authorities"
          label={translate("ACCOUNT_TYPE")}
          rules={[
            {
              required: true,
              message: translate("ACCOUNT_TYPE_ERROR"),
              type: "string",
            },
          ]}
        >
          <Select
            id="signup-user-authorities"
            placeholder={translate("ACCOUNT_TYPE")}
            className="form-input h-[40px] w-full !overflow-hidden !border"
            rootClassName="!outline-none !shadow-none"
            options={authoritiesList.map((authoritiesItem) => ({
              ...authoritiesItem,
              label: translate(authoritiesItem.label),
            }))}
            onChange={(value) => setSelectedAuthority(value)}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label={translate("SIGNUP_EMAIL")}
          rules={[
            {
              required: true,
              type: "email",
              message: translate("EMAIL_ERROR"),
            },
          ]}
        >
          <Input
            id="signup-email"
            className="form-input h-[40px] w-full"
            prefix={<MailFilled className="text-lg" />}
            placeholder={translate("SIGNUP_EMAIL")}
            type="email"
            onChange={(e) => {
              if (e.target.value) {
                setEmail(encodeURIComponent(e.target.value));
              } else {
                setEmail("");
              }
            }}
          />
        </Form.Item>
        <Form.Item
          name="firstName"
          label={translate("SIGNUP_NAME")}
          rules={[
            {
              required: true,
              message: translate("NAME_ERROR"),
            },
          ]}
        >
          <Input
            id="signup-name"
            className="form-input h-[40px] w-full"
            placeholder={translate("SIGNUP_NAME")}
            type="text"
            value={firstName}
            onChange={(e) => {
              if (e.target.value) {
                setFirstName(e.target.value);
              } else {
                setFirstName("");
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="mobile"
          label={translate("SIGNUP_MOBILE")}
          rules={[
            {
              required: true,
              message: translate("MOBILE_ERROR"),
            },
          ]}
        >
          <PhoneInput
            id="steps-phone"
            defaultCountry="EG"
            className="student-phone form-input h-[40px] border"
            international
            value={mobile}
            onChange={(phone) => {
              if (phone) {
                setMobile(phone);
              } else {
                setMobile("");
              }
            }}
            dir="ltr"
            labels={ar}
            countries={filteredCountries()}
          />
        </Form.Item>
        <Form.Item name="national_id" label={translate("SIGNUP_NATIONAL_ID")}>
          <Input
            id="signup-name"
            className="form-input h-[40px] w-full"
            placeholder={translate("SIGNUP_NATIONAL_ID")}
            type="text"
            value={nationalId}
            onChange={(e) => {
              if (e.target.value) {
                setNationalId(encodeURIComponent(e.target.value));
              } else {
                setNationalId("");
              }
            }}
          />
        </Form.Item>
        <UploadImage
          id="child-national-image"
          label="صورة الهوية"
          viewType="defaultView"
          defaultImages={[
            ...(attachUrl && attachUrl[0]?.link
              ? [
                  {
                    uid: attachUrl[0]?.id?.toString() || "",
                    url: attachUrl[0]?.link?.toString(),
                    name: "",
                  },
                ]
              : []),
          ]}
          maxLength={1}
          removeImage={removeImageUrl}
          setImageUrl={(url: string | void) => {
            if (url) setAttachmentUrl([...attachUrl, { link: url }]);
          }}
          title=""
          acceptTypes="image/jpeg,
                    image/jpg,
                    image/png,
                    image/webp,
                    image/bmp"
        />

        <Form.Item
          name="password"
          label={translate("SIGNUP_PASSWORD")}
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
            id="signup-pw"
            className="form-input h-[40px] w-full"
            prefix={<LockFilled className="text-lg" />}
            placeholder={translate("SIGNUP_PASSWORD")}
          />
        </Form.Item>

        <Form.Item
          name="confirm-password"
          label={translate("CONFIRM_PASSWORD")}
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
            id="signup-confirm-pw"
            className="form-input h-[40px] w-full"
            prefix={<LockFilled className="text-lg" />}
            placeholder={translate("CONFIRM_PASSWORD")}
          />
        </Form.Item>

        <div className="flex flex-col items-start">
          <MainButton
            onClick={() => formRef.submit()}
            classNameList="mt-2 mx-auto !w-full"
            textClass="!font-semibold"
            color="primary"
            text={
              storeLoading ? (
                <Spin className="white-spin" />
              ) : (
                translate("SIGNUP")
              )
            }
          />
          <div className="form-footer mt-4 flex items-center justify-center gap-1 text-sm">
            <span className="text-black">{translate("HAVE_AN_ACCOUNT")}</span>
            <Link
              href={"/login"}
              className="text-sm font-bold text-kafalaBlue duration-500 hover:text-kafalaPrimary"
            >
              {translate("LOGIN")}
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SignUp;
