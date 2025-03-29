import axios, { AxiosResponse } from "axios";
import client from "@/helpers/client";
import { useCallback, useEffect, useState } from "react";
import { IChildEducationStatus } from "@/types/child/childEducationStatus";


type ErrorType = { statusCode: number; message: string };

export default function useAddUpdateChildEducationStatus() {
  const [childEducationStatusData, setChildEducationStatusData] = useState<IChildEducationStatus | null>(null);
  const [addUpdateResponse, setAddUpdateResponse] = useState<AxiosResponse | null>(
    null
  );
  const [addUpdateError, setAddUpdateError] = useState<ErrorType | null>(null);
  const [addUpdateLoading, setAddUpdateLoading] = useState<boolean>(false);

  const callAPI = useCallback(async (newChildEducationStatusData: IChildEducationStatus) => {
    setAddUpdateError(null);
    try {
      setAddUpdateLoading(true);
      const response = await client.put("/api/v2/child-education-statuses/addUpdateChildEdicationStatus", newChildEducationStatusData);
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
      setChildEducationStatusData(null);
    }
  }, []);

  useEffect(() => {
    if (childEducationStatusData) {
      setAddUpdateResponse(null);
      callAPI(childEducationStatusData);
    }
  }, [childEducationStatusData, callAPI]);

  return { addUpdateResponse, addUpdateError, addUpdateLoading, setChildEducationStatusData };
}
