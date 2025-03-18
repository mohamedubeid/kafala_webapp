export type UserType = {
  id?: number;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: any[];
  password: string;
  imageUrl?: string;
  activationKey?: string;
  resetKey?: string;
  resetDate?: Date;
  mobile?: string;
  national_id?: string;
  attachment?: string | null;
};

export type LoginUser = {
  username?: string;
  password?: string;
  rememberMe?: string;
};

export type ChangePassword = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};
