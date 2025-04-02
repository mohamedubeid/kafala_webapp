import client from "@/helpers/client";
import { useCallback, useEffect, useState } from "react";

type ChildScoreType = {childId: number | undefined, score: number};

export default function useUpdateScore() {
  const [childScore, setChildScore] = useState<ChildScoreType | null>(null);

  const callAPI = useCallback(async ({childId, score}: ChildScoreType) => {
    await client.put("/api/v2/children/child/updateScore", {childId, score});
  }, []);

  useEffect(() => {
    if (childScore) {
      callAPI(childScore);
    }
  }, [childScore, callAPI]);

  return { setChildScore };
}
