import client from "@/helpers/client";
import { useQuery } from "@tanstack/react-query";

const useGetChildTotalSponsoredCost = (id: number) => {
  const getChildData = async (): Promise<{ totalCost: number }> => {
    const res = await client.get(
      `/api/v2/children/web/getChildTotalSponsored/${id}`,
      {
        params: {
          id,
        },
      }
    );
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children/useGetChildTotalSponsoredCost", id],
    queryFn: getChildData,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetChildTotalSponsoredCost;
