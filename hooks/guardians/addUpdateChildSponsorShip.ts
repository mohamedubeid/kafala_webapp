import axios, { AxiosResponse } from "axios";
import client from "@/helpers/client";
import { useCallback, useEffect, useState } from "react";
import { IChildSponsorShip } from "@/types/child/childSponsership";


type ErrorType = { statusCode: number; message: string };

export default function useAddUpdateChildSponsorShip() {
  const [childSponsorShipData, setChildSponsorShipData] = useState<IChildSponsorShip | null>(null);
  const [addUpdateResponse, setAddUpdateResponse] = useState<AxiosResponse | null>(
    null
  );
  const [addUpdateError, setAddUpdateError] = useState<ErrorType | null>(null);
  const [addUpdateLoading, setAddUpdateLoading] = useState<boolean>(false);

  const callAPI = useCallback(async (newChildSponsorShipData: IChildSponsorShip) => {
    setAddUpdateError(null);
    try {
      setAddUpdateLoading(true);
      const response = await client.put("/api/v2/child-sponsor-ships/addUpdateChildSponsorship", newChildSponsorShipData);
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
      setChildSponsorShipData(null);
    }
  }, []);

  useEffect(() => {
    if (childSponsorShipData) {
      setAddUpdateResponse(null);
      callAPI(childSponsorShipData);
    }
  }, [childSponsorShipData, callAPI]);

  return { addUpdateResponse, addUpdateError, addUpdateLoading, setChildSponsorShipData };
}
