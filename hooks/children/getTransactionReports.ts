import client from "@/helpers/client";
import { ChildDTO } from "@/types/child";
import { ChildTransactionDTO } from "@/types/childTransaction";
import { ChildTransactionReportDTO } from "@/types/childTransactionReport";
import { useQuery } from "@tanstack/react-query";

const useGetTransactionReports = (size: number) => {
  const getTransactionReports = async (): Promise<ChildTransactionReportDTO[]> => {
    const res = await client.get(
      `api/v2/child-transaction-reports/web/?size=${size}&sort=desc`
    );
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children/getTransactions"],
    queryFn: getTransactionReports,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetTransactionReports;
