import client from "@/helpers/client";
import { ChildDTO } from "@/types/child";
import { useQuery } from "@tanstack/react-query";

const useGetChild = (id: number, { enabled }: { enabled: boolean }) => {
  const getChildData = async (): Promise<ChildDTO> => {
    const res = await client.get(`/api/v2/children/${id}`, {
      params: {
        id,
      },
    });
    return res.data;
  };
  const {refetch, ...childDataQuery} = useQuery({
    queryKey: ["children/profile", id],
    queryFn: getChildData,
    enabled, // Use the enabled option to conditionally run the query
  });
  return {
    ...childDataQuery,
    refetch,
  };
};

export default useGetChild;
