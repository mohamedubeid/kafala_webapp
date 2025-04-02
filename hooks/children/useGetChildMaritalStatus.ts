import client from "@/helpers/client";
import { ChildMaritalStatusDTO } from "@/types/child";
import { useQuery } from "@tanstack/react-query";

const useGetChildMaritalStatus = (id: number, { enabled }: { enabled: boolean }) => {
  const getChildMaritalStatus = async (): Promise<ChildMaritalStatusDTO> => {
    const res = await client.get(`/api/v2/child-marital-statuses/${id}`);
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children-marital-status/profile", id],
    queryFn: getChildMaritalStatus,
    enabled,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetChildMaritalStatus;
