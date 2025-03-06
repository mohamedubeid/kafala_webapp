import client from "@/helpers/client";
import { ChildDTO } from "@/types/child";
import { useQuery } from "@tanstack/react-query";

const useGetChild = (id: number) => {
  const getChildData = async (): Promise<ChildDTO> => {
    const res = await client.get(`/api/v2/children/${id}`, {
      params: {
        id,
      },
    });
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children/profile", id],
    queryFn: getChildData,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetChild;
