import {
  getFromSessionStorage,
  saveToSessionStorage,
} from "@/helpers/sessionStorage";
import { useEffect, useState } from "react";

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const sessionToken = getFromSessionStorage("token");
    const localStorageToken = localStorage.getItem("token");
    if (sessionToken) {
      setToken(sessionToken);
    } else if (!localStorageToken && !sessionToken) {
      setToken(null);
    } else if (!sessionToken && localStorageToken) {
      saveToSessionStorage("token", localStorageToken);
    }
    if (sessionToken && localStorageToken) {
      setToken(sessionToken);
    }
    setLoading(false);
  }, []);

  return {
    token,
    isLoading: loading,
    setToken,
  };
};

export default useToken;
