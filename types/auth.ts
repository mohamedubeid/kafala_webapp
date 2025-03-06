import { FormInstance } from "antd";
import { UserType } from "./user";
import { Guarantor } from "./guarantor";

export type LoginValues = {
  email: string;
  password: string;
  rememberMe?: boolean;
  asGuarantor?: boolean;
};

export type AuthContextData = {
  user?: UserType | null;
  setUser: (user: UserType | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  login: (values: LoginValues, form: FormInstance) => void;
  logout: () => void;
  authModalVisiablity: boolean;
  setAuthModalVisiablity: (modalVisiablity: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  redirectUrl: string | null;
  setRedirectUrl: (url: string | null) => void;
};

export type GuarantorContextData = {
  guarantor?: Guarantor | null;
  setGuarantor: (guarantor: Guarantor | null) => void;
  getGuarantor: (guarantorId: number | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  redirectUrl: string | null;
  setRedirectUrl: (url: string | null) => void;
};

export type ResetPasswordType = {
  password: string;
  confirmPassword: string;
};

export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
