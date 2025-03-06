import axios, { AxiosResponse } from "axios";
import client from "@/helpers/client";
import { useCallback, useEffect, useState } from "react";
import { UserType } from "@/types/user";
type ErrorType = { statusCode: number; message: string };

export default function useStoreUser() {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [storeResponse, setStoreResponse] = useState<AxiosResponse | null>(
    null
  );
  const [storeError, setStoreError] = useState<ErrorType | null>(null);
  const [storeLoading, setStoreLoading] = useState<boolean>(false);

  const callAPI = useCallback(async (newUserData: UserType) => {
    setStoreError(null);
    try {
      setStoreLoading(true);
      const response = await client.post("/api/register", newUserData);
      setStoreResponse(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setStoreError({
            statusCode: error.response.status,
            message: error.response.data.message || "Unknown error",
          });
        }
      }
    } finally {
      setStoreLoading(false);
      setUserData(null);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      if (userData.login) {
        userData.email = userData.login;
      }
      setStoreResponse(null);
      callAPI(userData);
    }
  }, [userData, callAPI]);

  return { storeResponse, storeError, storeLoading, setUserData };
}
