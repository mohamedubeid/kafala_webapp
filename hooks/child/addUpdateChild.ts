import axios, { AxiosResponse } from "axios";
import client from "@/helpers/client";
import { useCallback, useEffect, useState } from "react";
import { IChild } from "@/types/child/profile";


type ErrorType = { statusCode: number; message: string };

export default function useAddUpdateChild() {
  const [childData, setChildData] = useState<IChild | null>(null);
  const [addUpdateResponse, setAddUpdateResponse] = useState<AxiosResponse | null>(
    null
  );
  const [addUpdateError, setAddUpdateError] = useState<ErrorType | null>(null);
  const [addUpdateLoading, setAddUpdateLoading] = useState<boolean>(false);

  const callAPI = useCallback(async (newChildData: IChild) => {
    setAddUpdateError(null);
    try {
      setAddUpdateLoading(true);
      const response = await client.put("/api/v2/children/addUpdateChild", newChildData);
      setAddUpdateResponse(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setAddUpdateError({
            statusCode: error.response.status,
            message: error.response.data.message || "Unknown error",
          });
        }
      }
    } finally {
      setAddUpdateLoading(false);
      setChildData(null);
    }
  }, []);

  useEffect(() => {
    if (childData) {
      setAddUpdateResponse(null);
      callAPI(childData);
    }
  }, [childData, callAPI]);

  return { addUpdateResponse, addUpdateError, addUpdateLoading, setChildData };
}
