import axios, { AxiosResponse } from "axios";
import client from "@/helpers/client";
import { useCallback, useEffect, useState } from "react";
import { IChildMaritalStatus } from "@/types/child/childMartialStatus";


type ErrorType = { statusCode: number; message: string };

export default function useAddUpdateChildMaritalStatus() {
  const [childMaritalStatusData, setChildMaritalStatusData] = useState<IChildMaritalStatus | null>(null);
  const [addUpdateResponse, setAddUpdateResponse] = useState<AxiosResponse | null>(
    null
  );
  const [addUpdateError, setAddUpdateError] = useState<ErrorType | null>(null);
  const [addUpdateLoading, setAddUpdateLoading] = useState<boolean>(false);

  const callAPI = useCallback(async (newChildMaritalStatusData: IChildMaritalStatus) => {
    setAddUpdateError(null);
    try {
      setAddUpdateLoading(true);
      const response = await client.put("/api/v2/child-marital-statuses/addUpdateChildMirtalStatus", newChildMaritalStatusData);
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
      setChildMaritalStatusData(null);
    }
  }, []);

  useEffect(() => {
    if (childMaritalStatusData) {
      setAddUpdateResponse(null);
      callAPI(childMaritalStatusData);
    }
  }, [childMaritalStatusData, callAPI]);

  return { addUpdateResponse, addUpdateError, addUpdateLoading, setChildMaritalStatusData };
}
