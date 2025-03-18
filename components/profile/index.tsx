import { useTranslation } from "next-i18next";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Form, Input, Select, Spin } from "antd";
import { MailFilled, LockFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import UploadImage from "uploads/UploadImage";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar.json";
import { MainButton } from "@/partial/MainButton";
import { authoritiesList } from "@/constants/authoritiesList";
import { filteredCountries } from "@/helpers/phoneCountries";
import { UserType } from "@/types/user";
import useUpdatePassword from "@/hooks/authentication/useUpdatePassword";
import useUpdateUser from "@/hooks/users/update";

const Profile = () => {
  const { t: translate } = useTranslation(["messages"]);
  const { user } = useAuth();
  const [formRef] = Form.useForm();
  const [passForm] = Form.useForm();
  const { updateUserPassword } = useUpdatePassword();
  const { setUpdatedUser, updateResponse, updateError, updateLoading } = useUpdateUser();
  const [attachUrl, setAttachmentUrl] = useState<{ id?: number; link?: string }[]>([]);

  const removeImageUrl = (imageIndex: number | void) => {
    const ImagesList = attachUrl;
    if (imageIndex) {
      ImagesList.splice(imageIndex - 1, 1);
    }
    setAttachmentUrl([...ImagesList]);
  };

  const onUpdateProfile = async (values: any) => {
    const updatedUser:  Omit<UserType, "password"> = {
      ...user,
      firstName: values.firstName,
      lastName: values.lastName,
      mobile: values.mobile,
      national_id: values.national_id,
      attachment: attachUrl && attachUrl.length ? attachUrl[0]?.link || attachUrl[1]?.link || null : null,
      authorities: user?.authorities
    };
    setUpdatedUser(updatedUser);
  };

  const onUpdatePassword = (values: any) => {
    updateUserPassword.mutate({
      currentPassword: values["old-password"],
      newPassword: values["new-password"],
    });
  };

  useEffect(() => {
    if (user) {
      const userAuthority = authoritiesList.find((auth) => auth.value === user.authorities?.[0])?.label || "GUARANTOR";
      formRef.setFieldsValue({
        authorities: translate(userAuthority),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        national_id: user.national_id,
      });
      if (user.attachment) {
        setAttachmentUrl([{ link: user.attachment }]);
      }
    }
  }, [user, formRef, translate]);

  useEffect(() => {
    if (updateResponse && updateResponse.data.uid) {
      toast(translate("UPDATE_SUCCESSFUL"), {
        type: "success",
        position: "top-center",
      });
    }
  }, [updateResponse]);

  useEffect(() => {
    if (updateError) {
      if (updateError.statusCode === 400) {
        switch (updateError.message) {
          case "error.mobileexists":
            toast(translate("MOBILE_EXISTS"), {
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
  }, [updateError]);

  return (
    <div className="min-h-[500px] w-full overflow-hidden bg-kafalaLight-100 pb-4">
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="min-h-[500px] bg-white px-6 py-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-16 mt-4">
            <div className="w-full">
              <div className="section-title text-2xl font-bold">
                {translate("common:NAV_PROFILE")}
              </div>
              <div className="w-full ps-4">
                <Form
                  layout="vertical"
                  form={formRef}
                  className="profile-form auth-form flex w-full flex-col gap-4"
                  id="profile-form"
                  onFinish={onUpdateProfile}
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
                      disabled
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
                      disabled
                    />
                  </Form.Item>
                  <Form.Item
                    name="firstName"
                    label={translate("SIGNUP_FIRST_NAME")}
                    rules={[
                      {
                        required: true,
                        message: translate("NAME_ERROR"),
                      },
                    ]}
                  >
                    <Input
                      id="signup-first-name"
                      className="form-input h-[40px] w-full"
                      placeholder={translate("SIGNUP_FIRST_NAME")}
                      type="text"
                    />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    label={translate("SIGNUP_LAST_NAME")}
                  >
                    <Input
                      id="signup-last-name"
                      className="form-input h-[40px] w-full"
                      placeholder={translate("SIGNUP_LAST_NAME")}
                      type="text"
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
                      dir="ltr"
                      labels={ar}
                      countries={filteredCountries()}
                      onChange={() => {}}
                    />
                  </Form.Item>
                  <Form.Item name="national_id" label={translate("SIGNUP_NATIONAL_ID")}>
                    <Input
                      id="national_id"
                      className="form-input h-[40px] w-full"
                      placeholder={translate("SIGNUP_NATIONAL_ID")}
                      type="text"
                    />
                  </Form.Item>
                  <UploadImage
                    id="child-national-image"
                    label="صورة الهوية"
                    viewType="defaultView"
                    maxLength={1}
                    setImageUrl={(url: string | void) => {
                      if (url) setAttachmentUrl([...attachUrl, { link: url }]);
                    }}
                    title=""
                    acceptTypes="image/jpeg, image/jpg, image/png, image/webp, image/bmp"
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
                    removeImage={removeImageUrl}
                  />
                  <div className="flex flex-col items-start">
                    <MainButton
                      onClick={() => formRef.submit()}
                      classNameList="mt-2 mx-auto !w-full"
                      textClass="!font-semibold"
                      color="primary"
                      text={
                        updateLoading ? (
                          <Spin className="white-spin" />
                        ) : (
                          translate("EDIT_PROFILE")
                        )
                      }
                    />
                  </div>
                </Form>
              </div>
            </div>

            <div className="w-full">
              <div className="section-title text-2xl font-bold">
                {translate("SIGNUP_PASSWORD")}
              </div>
              <div className="w-full ps-4">
                <Form
                  layout="vertical"
                  form={passForm}
                  className="profile-form auth-form flex w-full flex-col gap-4"
                  id="change-password-form"
                  onFinish={onUpdatePassword}
                >
                  <Form.Item
                    name="old-password"
                    label={translate("OLD_PASSWORD")}
                    rules={[
                      { required: true, message: translate("OLD_PASSWORD_ERROR") },
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
                      id="profile-old-pw"
                      className="form-input h-[40px] w-full"
                      prefix={<LockFilled className="text-lg" />}
                      placeholder={translate("OLD_PASSWORD")}
                    />
                  </Form.Item>
                  <Form.Item
                    name="new-password"
                    label={translate("NEW_PASSWORD")}
                    rules={[
                      { required: true, message: translate("NEW_PASSWORD_ERROR") },
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
                      id="profile-new-pw"
                      className="form-input h-[40px] w-full"
                      prefix={<LockFilled className="text-lg" />}
                      placeholder={translate("NEW_PASSWORD")}
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirm-new-password"
                    label={translate("CONFIRM_NEW_PASSWORD")}
                    rules={[
                      { required: true, message: translate("CONFIRM_NEW_PASSWORD_ERROR") },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("new-password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(translate("CONFIRM_PASSOWRD_MATCH_ERROR"))
                          );
                        },
                      }),
                    ]}
                    dependencies={["new-password"]}
                  >
                    <Input.Password
                      id="profile-confirm-pw"
                      className="form-input h-[40px] w-full"
                      prefix={<LockFilled className="text-lg" />}
                      placeholder={translate("CONFIRM_NEW_PASSWORD")}
                    />
                  </Form.Item>

                  <div className="flex flex-col items-start">
                    <MainButton
                      onClick={() => passForm.submit()}
                      classNameList="mt-2 mx-auto !w-full"
                      textClass="!font-semibold"
                      color="primary"
                      text={
                        updateUserPassword.isLoading ? (
                          <Spin className="white-spin" />
                        ) : (
                          translate("CHANGE_PASSWORD")
                        )
                      }
                    />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
