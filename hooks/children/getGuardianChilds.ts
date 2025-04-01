import client from "@/helpers/client";
import { ChildDTO } from "@/types/child";
import { useQuery } from "@tanstack/react-query";

const useGetGuardianChilds = () => {
  const getGuardianChilds = async (): Promise<ChildDTO[]> => {
    const res = await client.get(
      "/api/v2/children/web/getGuardianChilds"
    );
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children/getGuardianChilds"],
    queryFn: getGuardianChilds,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetGuardianChilds;
