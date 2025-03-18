import axios, { AxiosResponse } from "axios";
import client from "@/helpers/client";
import { useCallback, useEffect, useState } from "react";
import { UserType } from "@/types/user";
import { useAuth } from "@/contexts/AuthContext";
type ErrorType = { statusCode: number; message: string };

export default function useUpdateUser() {
  const [updatedUser, setUpdatedUser] = useState<Omit<UserType, "password"> | null>(null);
  const [updateResponse, setUpdateResponse] = useState<AxiosResponse | null>(
    null
  );
  const [updateError, setUpdateError] = useState<ErrorType | null>(null);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  const {setUser, user} = useAuth();

  const callAPI = useCallback(async (newUserData: Omit<UserType, "password">) => {
    setUpdateError(null);
    try {
      setUpdateLoading(true);
      const response = await client.post("/api/account", newUserData);
      setUpdateResponse(response);
      // if (user) {
      //   user.firstName = newUserData.firstName;
      //   user.lastName = newUserData.lastName;
      //   user.mobile = newUserData.mobile;
      //   user.national_id = newUserData.national_id;
      //   user.attachment = newUserData.attachment;
      //   // setUser({
      //   //   ...user,
      //   //   firstName: newUserData.firstName,
      //   //   lastName: newUserData.lastName,
      //   //   mobile: newUserData.mobile,
      //   //   national_id: newUserData.national_id,
      //   //   attachment: newUserData.attachment,
      //   //   authorities: user.authorities,
      //   //   password: ""
      //   // });
      //   setUser(user);
      // }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setUpdateError({
            statusCode: error.response.status,
            message: error.response.data.message || "Unknown error",
          });
        }
      }
    } finally {
      setUpdateLoading(false);
      setUpdatedUser(null);
    }
  }, []);

  useEffect(() => {
    if (updatedUser) {
      if (updatedUser.login) {
        updatedUser.email = updatedUser.login;
      }
      setUpdateResponse(null);
      callAPI(updatedUser);
    }
  }, [updatedUser, callAPI]);

  return { updateResponse, updateError, updateLoading, setUpdatedUser };
}
