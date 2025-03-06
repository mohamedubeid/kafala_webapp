import { KafeelDTO } from "./kafeel";

export type KafeelContextData = {
  kafeel?: KafeelDTO | null;
  setKafeel: (kafeel: KafeelDTO | null) => void;
  getKafeel: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  redirectUrl: string | null;
  setRedirectUrl: (url: string | null) => void;
};
