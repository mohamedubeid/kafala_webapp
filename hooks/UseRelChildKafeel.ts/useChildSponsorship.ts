import { RelChildKafeels } from "@/types/kafeel";
import axios, { AxiosResponse } from "axios";
import client from "helpers/client";
import { useCallback, useState } from "react";

export default function useChildSponsorship() {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submitSponsorship = useCallback(async (data: RelChildKafeels) => {
    setError(null);
    try {
      setLoading(true);
      const res = await client.post("/api/v2/rel-child-kafeels", data);
      setResponse(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setError("BAD_REQUEST");
        } else {
          setError("SERVER_ERROR");
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { submitSponsorship, response, error, loading };
}
