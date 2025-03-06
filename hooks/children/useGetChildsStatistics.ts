import client from "@/helpers/client";
import { ChildDTO } from "@/types/child";
import { useQuery } from "@tanstack/react-query";

const useGetChildStatistics = () => {
  const getChildStatisticsData = async (): Promise<{
    fatherOrphanCount: number | 0;
    motherOrphanCount: number | 0;
    fatherAndMotherCount: number | 0;
  }> => {
    const res = await client.get("/api/v2/children/web/childStatistics");
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children/childStatistics"],
    queryFn: getChildStatisticsData,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetChildStatistics;
