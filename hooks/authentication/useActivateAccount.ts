import client from "@/helpers/client";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

const useActivateAccount = () => {
  const [token, setToken] = useState<string | null>(null);
  const [activationResponse, setActivationResponse] =
    useState<AxiosResponse | null>();
  const [activationError, setActivationError] = useState<string | null>(null);
  const activateAccount = useCallback(async (userToken: string) => {
    setActivationError(null);
    try {
      const res = await client.get(`/api/activate/user?token=${userToken}`);
      setActivationResponse(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setActivationError("BAD_REQUEST");
        } else {
          setActivationError("SERVER_ERROR");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      setActivationResponse(null);
      activateAccount(token);
    }
  }, [token]);

  return {
    setToken,
    activationResponse,
    activationError,
  };
};

export default useActivateAccount;
