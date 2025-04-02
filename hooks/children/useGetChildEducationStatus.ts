import client from "@/helpers/client";
import { ChildEducationStatusDTO } from "@/types/child";
import { useQuery } from "@tanstack/react-query";

const useGetChildEducationStatus = (id: number, { enabled }: { enabled: boolean }) => {
  const getChildEducationStatus = async (): Promise<ChildEducationStatusDTO> => {
    const res = await client.get(`/api/v2/child-education-statuses/${id}`);
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children-education-status/profile", id],
    queryFn: getChildEducationStatus,
    enabled,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetChildEducationStatus;
