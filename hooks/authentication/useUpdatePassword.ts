import client from "@/helpers/client";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { toast } from "react-toastify";

const useUpdatePassword = () => {
  const [err, setErr] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { i18n, t: translate } = useTranslation("messages");

  const updatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    setLoading(true);
    setSuccess(false);
    if (currentPassword == newPassword) {
      setSuccess(false);
      setLoading(false);
      toast.error(translate("SAME_PASSWORD"));
    } else {
      await client
        .post("/api/account/change-password", {
          currentPassword: currentPassword ? currentPassword : null,
          newPassword,
        })
        .then(() => {
          setSuccess(true);
          setLoading(false);
          toast.success(translate("CHANGE_PASSWORD_SUCCESS"));
        })
        .catch((error) => {
          setSuccess(false);
          setLoading(false);
          setErr(error.response.data.message);

          let errorMessage = translate("CHANGE_PASSWORD_ERROR");
          if (error?.response?.data?.message == "InvalidLoginName") {
            errorMessage = translate("INVALID_USER");
          }
          if (error?.response?.data?.message == "InvalidPassword") {
            errorMessage = translate("INVALID_PASSWORD");
          }
          toast.error(errorMessage);
        });
    }
  };
  const updateUserPassword = useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => updatePassword(currentPassword, newPassword),
  });
  return {
    updateUserPassword,
    err,
    success,
    loading,
  };
};

export default useUpdatePassword;
