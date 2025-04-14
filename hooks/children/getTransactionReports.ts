import client from "@/helpers/client";
import { ChildDTO } from "@/types/child";
import { ChildTransactionDTO } from "@/types/childTransaction";
import { ChildTransactionReportDTO } from "@/types/childTransactionReport";
import { useQuery } from "@tanstack/react-query";

const useGetTransactionReports = (size: number, page: number) => {
  const getTransactionReports = async (): Promise<{data: ChildTransactionReportDTO[], count: number}> => {
    const res = await client.get(
      `api/v2/child-transaction-reports/web`, {
        params: {
          page: page ? Number(page) - 1 : 0,
          size: size ? Number(size) : 20,
        }
      }
    );
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children/getTransactions", page, size],
    queryFn: getTransactionReports,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetTransactionReports;
