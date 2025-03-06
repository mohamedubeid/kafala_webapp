import axios, { AxiosResponse } from "axios";
import client from "helpers/client";
import { useCallback, useEffect, useState } from "react";
// import { ResetPasswordType } from 'types/user';

export default function useResetPasswordFinish() {
  const [token, setToken] = useState<string>();
  const [passwordData, setPasswordData] = useState<any | null>(null);
  const [resetResponse, setResetResponse] = useState<AxiosResponse | null>(
    null
  );
  const [resetError, setResetError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const callAPI = useCallback(
    async (PasswordData: any) => {
      setResetError(null);
      try {
        setLoading(true);
        const response = await client.post(
          `/api/account/reset-password/finish?token=${token}`,
          { ...PasswordData, token }
        );
        setResetResponse(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.message === "User Not Found") {
            setResetError("USER_NOT_FOUND");
          } else if (error.response?.status === 400) {
            setResetError("TOKEN_EXPIRED");
          } else {
            setResetError("SERVER_ERROR");
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (passwordData && token) {
      setResetResponse(null);
      callAPI(passwordData);
    }
  }, [passwordData, callAPI]);

  return { resetResponse, resetError, loading, setPasswordData, setToken };
}
