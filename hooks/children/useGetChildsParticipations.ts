import client from "@/helpers/client";
import { ChildCertificateDTO } from "@/types/childParticipation";
import { useQuery } from "@tanstack/react-query";

const useGetChildParticipations = () => {
  const getChildParticipationData = async (): Promise<
    ChildCertificateDTO[]
  > => {
    const res = await client.get(
      "/api/v2/rel-child-kafeels/web/getKafeelChildCertificate"
    );
    return res.data;
  };
  const childDataQuery = useQuery({
    queryKey: ["children/getKafeelChildCertificate"],
    queryFn: getChildParticipationData,
  });
  return {
    ...childDataQuery,
  };
};

export default useGetChildParticipations;
