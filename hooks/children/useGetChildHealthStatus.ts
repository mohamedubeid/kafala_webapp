import client from "@/helpers/client";
import { ChildHealthStatusDTO } from "@/types/child";
import { useQuery } from "@tanstack/react-query";

const useGetChildHealthStatus = (id: number, { enabled }: { enabled: boolean }) => {
  const getChildHealthStatus = async (): Promise<ChildHealthStatusDTO> => {
    const res = await client.get(`/api/v2/child-health-statuses/${id}`);
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children-health-status/profile", id],
    queryFn: getChildHealthStatus,
    enabled,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetChildHealthStatus;
