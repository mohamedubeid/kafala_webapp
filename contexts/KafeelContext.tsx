import client from "@/helpers/client";
import { KafeelContextData } from "@/types/kafeelContextData";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { KafeelDTO } from "@/types/kafeel";

type ProviderProps = {
  children: ReactNode;
};

export const KafeelContext = createContext<KafeelContextData>({
  kafeel: null,
  setKafeel: () => {},
  getKafeel: () => {},
  loading: true,
  setLoading: () => {},
  redirectUrl: null,
  setRedirectUrl: () => {},
});

export default function KafeelContextProvider({ children }: ProviderProps) {
  const [kafeel, setKafeel] = useState<KafeelDTO | null | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const router = useRouter();

  const getKafeel = useCallback(async () => {
    setLoading(true);
    await client
      .get(`/api/v2/kafeels/web/getKafeelByUser`)
      .then(async (response) => {
        setKafeel(response.data as KafeelDTO);
      })
      .catch((error) => {
        if (
          error.response.data &&
          error.response.data.message &&
          error.response.data.message.message
        ) {
          let errorMessage = error.response?.data.message.message;
          toast.error(errorMessage, {
            autoClose: 3000,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router, redirectUrl]);

  const values = useMemo(
    () => ({
      kafeel,
      setKafeel,
      getKafeel,
      loading,
      setLoading,
      redirectUrl,
      setRedirectUrl,
    }),
    [kafeel, loading, redirectUrl]
  );

  return (
    <KafeelContext.Provider value={values}>{children}</KafeelContext.Provider>
  );
}

export function useKafeel() {
  const context: KafeelContextData = useContext(KafeelContext);
  if (!context) {
    throw new Error("useKafeel must be used within KafeelsContextProvider");
  }
  return context;
}
