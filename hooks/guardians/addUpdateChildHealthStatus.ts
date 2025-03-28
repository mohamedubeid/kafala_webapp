import axios, { AxiosResponse } from "axios";
import client from "@/helpers/client";
import { useCallback, useEffect, useState } from "react";
import { IChildHealthStatus } from "@/types/child/healthStatus";


type ErrorType = { statusCode: number; message: string };

export default function useAddUpdateChildHealthStatus() {
  const [childHealthStatusData, setChildHealthStatusData] = useState<IChildHealthStatus | null>(null);
  const [addUpdateResponse, setAddUpdateResponse] = useState<AxiosResponse | null>(
    null
  );
  const [addUpdateError, setAddUpdateError] = useState<ErrorType | null>(null);
  const [addUpdateLoading, setAddUpdateLoading] = useState<boolean>(false);

  const callAPI = useCallback(async (newChildHealthStatusData: IChildHealthStatus) => {
    setAddUpdateError(null);
    try {
      setAddUpdateLoading(true);
      const response = await client.put("/api/v2/child-health-statuses/addUpdateChildHealthStatus", newChildHealthStatusData);
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
      setChildHealthStatusData(null);
    }
  }, []);

  useEffect(() => {
    if (childHealthStatusData) {
      setAddUpdateResponse(null);
      callAPI(childHealthStatusData);
    }
  }, [childHealthStatusData, callAPI]);

  return { addUpdateResponse, addUpdateError, addUpdateLoading, setChildHealthStatusData };
}
