import client from "@/helpers/client";
import { AboutChildList } from "@/types/child";
import { useQuery } from "@tanstack/react-query";

const useGetAboutChildren = (getAboutChildren: string) => {
  const getChildren = async (): Promise<AboutChildList> => {
    const res = await client.get(`/api/v2/children/aboutus/chilList`);
    return res.data;
  };
  const childrenQuery = useQuery({
    queryKey: ["/about", getAboutChildren],
    queryFn: getChildren,
  });
  return {
    ...childrenQuery,
  };
};

export default useGetAboutChildren;
