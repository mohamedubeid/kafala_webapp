import client from "@/helpers/client";
import { SettingDTO } from "@/types/settings";
import { useQuery } from "@tanstack/react-query";

const useDonationsReachChildrenWithoutExpenses = () => {
  const getDonationsReachChildrenWithoutExpenses =
    async (): Promise<SettingDTO> => {
      const res = await client.get(
        `/api/v2/settings/donations_reach_children_without_expenses`
      );
      return res.data;
    };

  const aboutDataQuery = useQuery({
    queryKey: ["donations_reach_children_without_expenses"],
    queryFn: getDonationsReachChildrenWithoutExpenses,
    refetchOnWindowFocus: true,
    // refetchInterval: 1000,
  });

  return {
    ...aboutDataQuery,
  };
};

export default useDonationsReachChildrenWithoutExpenses;
