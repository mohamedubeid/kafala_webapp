import client from "@/helpers/client";
import { useQuery } from "@tanstack/react-query";

const useGetTotalSponsoredChildren = () => {
  const getTotalSponsoredChild = async (): Promise<number> => {
    const res = await client.get(
      "/api/v2/rel-child-kafeels/web/getTotalChildSponsored"
    );
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children/getTotalChildSponsored"],
    queryFn: getTotalSponsoredChild,
  });

  return {
    ...childDataQuery,
    refetch: childDataQuery.refetch,
  };
};

export default useGetTotalSponsoredChildren;
