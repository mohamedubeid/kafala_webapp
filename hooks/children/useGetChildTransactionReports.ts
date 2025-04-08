import client from "@/helpers/client";
import { ChildCertificateDTO } from "@/types/childParticipation";
import { ChildTransactionReportDTO } from "@/types/childTransactionReport";
import { useQuery } from "@tanstack/react-query";

const useGetChildTransactionReports = (childId: number) => {
  const getChildTransactionReports = async (): Promise<
  ChildTransactionReportDTO[]
  > => {
    const res = await client.get(
      `/api/v2/child-transaction-reports/web/${childId}`
    );
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children/child-transaction-reports", childId],
    queryFn: getChildTransactionReports,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetChildTransactionReports;
