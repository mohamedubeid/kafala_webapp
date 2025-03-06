import client from "@/helpers/client";
import { RelChildKafeel } from "@/types/rel-child-kafeel";
import { useQuery } from "@tanstack/react-query";

const useGetFirstSubscriptionPending = (childId: number) => {
  const firstSubscriptionPending = async (): Promise<RelChildKafeel> => {
    if (!childId) {
      throw new Error("Child ID is required");
    }

    const res = await client.get(
      `/api/v2/rel-child-kafeels/web/getFirstPendingSubscription/${childId}`
    );
    return res.data;
  };

  const { refetch, ...queryData } = useQuery({
    queryKey: ["children/getFirstSubscriptionPending", childId],
    queryFn: firstSubscriptionPending,
    enabled: !!childId,
  });

  return {
    ...queryData,
    refetch,
  };
};

export default useGetFirstSubscriptionPending;
