import client from "@/helpers/client";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { toast } from "react-toastify";

const useUpdatePassword = () => {
  const { t: translate } = useTranslation("messages");

  const updatePassword = async ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }) => {
    if (currentPassword == newPassword) {
      toast.error(translate("SAME_PASSWORD"));
      throw new Error("SAME_PASSWORD");
    } 
      const response = await client
        .post("/api/account/change-password", {
          currentPassword: currentPassword ? currentPassword : null,
          newPassword,
        })
        return response.data;
  };
  const updateUserPassword = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success(translate("CHANGE_PASSWORD_SUCCESS"));
    },
    onError: (error: any) => {
      let errorMessage = translate("CHANGE_PASSWORD_ERROR");
      if (error?.response?.data?.message == "InvalidLoginName") {
        errorMessage = translate("INVALID_USER");
      }
      if (error?.response?.data?.message == "InvalidPassword") {
        errorMessage = translate("INVALID_PASSWORD");
      }
      toast.error(errorMessage);
    }
  });

  return {
    updateUserPassword,
  };
};

export default useUpdatePassword;
