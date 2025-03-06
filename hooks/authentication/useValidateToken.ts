import client from "@/helpers/client";
import { useQuery } from "@tanstack/react-query";
import useToken from "./useToken";

const useValidateToken = () => {
  const { token } = useToken();
  const validateToken = async () => client.get("/api/account");
  const validateTokenQuery = useQuery({
    queryKey: ["validate-token", token],
    queryFn: validateToken,
    enabled: !!token,
  });

  return {
    ...validateTokenQuery,
  };
};

export default useValidateToken;
