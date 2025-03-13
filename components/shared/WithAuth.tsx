import { useAuth } from "@/contexts/AuthContext";
import useToken from "@/hooks/authentication/useToken";
import useValidateToken from "@/hooks/authentication/useValidateToken";
import { useRouter } from "next/router";
import { ComponentType, FC, useEffect, useState } from "react";

type WrapperProps = {};

const WithAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P & WrapperProps> => {
  function Wrapper(props: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { isError, isLoading, isSuccess } = useValidateToken();
    const { user } = useAuth();
    const { token } = useToken();

    useEffect(() => {
      if (!token && !isLoading) {
        router.push("/");
        setLoading(false);
      }
      if (isSuccess) {
        setLoading(false);
      }
      if (isError && !isLoading) {
        setLoading(false);
        router.push("/");
      }
      if (user && !isError && !isLoading) {
        setLoading(false);
        if (user.authorities?.includes("ROLE_GUARANTOR")||
        user.authorities?.includes("ROLE_CHILD_GUARDIAN")) {
          setLoading(false);
        } else {
          setLoading(false);
          router.push("/");
        }
      }
      setLoading(false);
    }, [isError, isSuccess, user, isLoading, token]);

    return loading ? <div /> : <WrappedComponent {...props} />;
  }
  return Wrapper;
};
export default WithAuth;
