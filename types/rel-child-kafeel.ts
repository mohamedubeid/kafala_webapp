export enum RelChildKafeelStatus {
  PENDING = "PENDING",

  ACCEPTED = "ACCEPTED",

  REJECTED = "REJECTED",
}

export enum SponsershipDuration {
  MONTHLY = "MONTHLY",

  QUARTERLY = "QUARTERLY",

  SEMIANNUAL = "SEMIANNUAL",

  ANNUAL = "ANNUAL",
}

export type RelChildKafeel = {
  id: number;
  cost: number;
  status: RelChildKafeelStatus;
  duration: SponsershipDuration;
  expirationDate: any;
  startDate: any;
};
