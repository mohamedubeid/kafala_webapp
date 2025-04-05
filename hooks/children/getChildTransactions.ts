import client from "@/helpers/client";
import { ChildDTO } from "@/types/child";
import { ChildTransactionDTO } from "@/types/childTransaction";
import { useQuery } from "@tanstack/react-query";

const useGetChildTransactions = (childId: number) => {
  const getChildTransactions = async (): Promise<ChildTransactionDTO[]> => {
    const res = await client.get(
      `api/v2/rel-child-kafeels/web/getChildTransactions/${childId}`
    );
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children/getChildTransactions"],
    queryFn: getChildTransactions,
    enabled: !!childId,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetChildTransactions;
