import client from "@/helpers/client";
import { ChildSponsorShipDTO } from "@/types/child";
import { useQuery } from "@tanstack/react-query";

const useGetChildSponsorShip = (id: number, { enabled }: { enabled: boolean }) => {
  const getChildSponsorShip = async (): Promise<ChildSponsorShipDTO> => {
    const res = await client.get(`/api/v2/child-sponsor-ships/${id}`);
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children-sponsor-ship", id],
    queryFn: getChildSponsorShip,
    enabled,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetChildSponsorShip;
