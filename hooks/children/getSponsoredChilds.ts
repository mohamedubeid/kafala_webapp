import client from "@/helpers/client";
import { ChildSponsoredDTO } from "@/types/childSponsored";
import { useQuery } from "@tanstack/react-query";

const useGetSponsoredChildren = () => {
  const getSponsoredChild = async (): Promise<ChildSponsoredDTO[]> => {
    const res = await client.get(
      "/api/v2/rel-child-kafeels/web/getKafeelChilds"
    );
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children/getKafeelChilds"],
    queryFn: getSponsoredChild,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetSponsoredChildren;
