import client from "@/helpers/client";
import { useQuery } from "@tanstack/react-query";

const useSponsoredChildsIds = () => {
  const childsId = async (): Promise<number[]> => {
    const res = await client.get(
      "api/v2/rel-child-kafeels/web/getKafeelChildsIds"
    );
    return res.data;
  };
  const childsIds = useQuery({
    queryKey: ["getKafeelChildsIds"],
    queryFn: childsId,
  });
  return {
    data: childsIds,
  };
};

export default useSponsoredChildsIds;
