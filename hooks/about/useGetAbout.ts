import client from "@/helpers/client";
import { SettingDTO } from "@/types/settings";
import { useQuery } from "@tanstack/react-query";

const useGetAbout = () => {
  const getAboutData = async (): Promise<SettingDTO> => {
    const res = await client.get(`/api/v2/settings/aboutUs`);
    return res.data;
  };
  const aboutDataQuery = useQuery({
    queryKey: ["/about"],
    queryFn: getAboutData,
    refetchInterval: 10000,
  });
  return {
    ...aboutDataQuery,
  };
};

export default useGetAbout;
