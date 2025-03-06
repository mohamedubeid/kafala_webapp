import client from "@/helpers/client";
import { AuthContextData, LoginValues } from "@/types/auth";
import { UserType } from "@/types/user";
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
import { useQueryClient } from "@tanstack/react-query";
import { FormInstance } from "antd";
import { useTranslation } from "next-i18next";

type ProviderProps = {
  children: ReactNode;
  SSRUser?: UserType | null;
};

export const AuthContext = createContext<AuthContextData>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  login: () => {},
  logout: () => {},
  loading: true,
  authModalVisiablity: false,
  setAuthModalVisiablity: () => {},
  setLoading: () => {},
  redirectUrl: null,
  setRedirectUrl: () => {},
});

export default function AuthContextProvider({
  children,
  SSRUser = undefined,
}: ProviderProps) {
  const { i18n, t: translate } = useTranslation(["messages"]);
  const [user, setUser] = useState<UserType | null | undefined>(SSRUser);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(
    null
  );
  const [authModalVisiablity, setAuthModalVisiablity] =
    useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const login = useCallback(
    async (values: LoginValues, form: FormInstance) => {
      setLoading(true);
      setLoginErrorMessage(null);
      await client
        .post(
          `/api/login`,
          { ...values },
          {
            baseURL: router.basePath,
          }
        )
        .then(async (response) => {
          setAuthModalVisiablity(false);
          client.defaults.headers.common.Authorization = `Bearer ${response.data.id_token}`;
          setToken(response.data.id_token);
          setUser(response.data.user as UserType);
          if (
            response.data &&
            response.data.user &&
            response.data.user.authorities &&
            response.data.user.authorities.length >= 0
          ) {
            // Redirect After Login
            console.log("LOGIN");
          }
        })
        .catch((error) => {
          if (
            error.response.data &&
            error.response.data.message &&
            error.response.data.message.message
          ) {
            let errorMessage = error.response?.data.message.message;
            if (errorMessage === "Invalid login name or password!") {
              errorMessage = "EMAIL_PW_ERROR";
            }
            if (errorMessage === "Your account is not been activated!") {
              errorMessage = "NOT_ACTIVATED";
            }
            toast.error(translate(errorMessage), {
              autoClose: 3000,
            });
          }
        })
        .finally(() => {
          setLoading(false);
          form.resetFields();
        });
    },
    [router, redirectUrl]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    await client
      .get("/api/logout", {
        baseURL: router.basePath,
      })
      .then(() => {
        queryClient.removeQueries({});
        setLoading(false);
        setUser(null);
        setRedirectUrl(null);
        delete client.defaults.headers.common.Authorization;
        router.replace("/");
      });
  }, [router]);

  const values = useMemo(
    () => ({
      user,
      token,
      setToken,
      setUser,
      login,
      logout,
      loading,
      authModalVisiablity,
      setAuthModalVisiablity,
      setLoading,
      redirectUrl,
      setRedirectUrl,
    }),
    [user, token, loading, redirectUrl, authModalVisiablity]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context: AuthContextData = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return context;
}
