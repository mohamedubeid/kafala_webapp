import axios, { AxiosResponse } from "axios";
import client from "helpers/client";
import { useCallback, useEffect, useState } from "react";

export default function useResetPasswordInit() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const callAPI = useCallback(async (email: string) => {
    setResetPasswordError(null);
    try {
      setLoading(true);
      const res = await client.post(
        `/api/account/user/reset-password/init?email=${email}`,
        {
          email,
        }
      );
      setResponse(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message === "Invalid email") {
          setResetPasswordError("INVALID_EMAIL");
        } else if (error.response?.status === 400) {
          setResetPasswordError("EMAIL_NOT_EXISTS");
        } else {
          setResetPasswordError("SERVER_ERROR");
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      setResponse(null);
      callAPI(userEmail);
    }
  }, [userEmail, callAPI]);

  return { response, resetPasswordError, loading, setUserEmail };
}
