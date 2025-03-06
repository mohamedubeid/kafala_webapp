import { ITEMS_PER_PAGE } from "@/constants/pagination";
import client from "@/helpers/client";
import { ChildDTO } from "@/types/child";
import { useQuery } from "@tanstack/react-query";

const useGetChildrenQuery = (
  name: string,
  page: number,
  size: number,
  ageFrom?: number | null,
  ageTo?: number | null,
  sponsershipType?: string,
  orphanClassification?: string,
  startDate?: string,
  endDate?: string,
  hasSponership?: boolean
) => {
  const getChildren = async (): Promise<{
    data: ChildDTO[];
    count: number;
  }> => {
    const res = await client.get(`/api/v2/children/getChilds`, {
      params: {
        name: name || null,
        ageFrom: ageFrom || ageFrom == 0 ? Number(ageFrom) : null,
        ageTo: Number(ageTo) || null,
        sponerShipType: sponsershipType || null,
        orphanClassification: orphanClassification || null,
        startDate: startDate || null,
        endDate: endDate || null,
        hasSponership: hasSponership || null,
        page: page ? Number(page) - 1 : 0,
        size: size ? Number(size) : ITEMS_PER_PAGE,
      },
    });
    return res.data;
  };
  const childrenQuery = useQuery({
    queryKey: [
      "/",
      name,
      page,
      size,
      ageFrom,
      ageTo,
      sponsershipType,
      orphanClassification,
      startDate,
      endDate,
    ],
    queryFn: getChildren,
  });
  return {
    ...childrenQuery,
  };
};

export default useGetChildrenQuery;
