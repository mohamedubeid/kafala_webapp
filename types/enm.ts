// export enum SponserConnection {
//   DIRECT = "DIRECT",
//   INDIRECT = "INDIRECT",
//   OTHER = "OTHER",
// }
export enum SponserConnection {
  RELATIVE = "RELATIVE",
  ORGANIZATION = "ORGANIZATION",
  OTHER = "OTHER",
}

export enum SponsershipParty {
  INDIVIDUAL = "INDIVIDUAL",
  ORGANIZATION = "ORGANIZATION",
  OTHER = "OTHER",
}

export enum SponsershipDuration {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  SEMIANNUAL = "SEMIANNUAL",
  ANNUAL = "ANNUAL",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum DisabilityTypes {
  PHYSICAL = "PHYSICAL",
  VISUAL = "VISUAL",
  HEARING = "HEARING",
  COGNITIVE = "COGNITIVE",
  OTHER = "OTHER",
}

export enum OrphanClassification {
  FATHER_ORPHAN = "FATHER_ORPHAN",
  MOTHER_ORPHAN = "MOTHER_ORPHAN",
  OTHER = "OTHER",
}

export enum MentalIllnessTypes {
  DEPRESSION = "DEPRESSION",
  ANXIETY = "ANXIETY",
  BIPOLAR_DISORDER = "BIPOLAR_DISORDER",
  SCHIZOPHRENIA = "SCHIZOPHRENIA",
  PTSD = "PTSD",
  OCD = "OCD",
  OTHER = "OTHER",
}
export enum LastLevelOfEducation {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  TERTIARY = "TERTIARY",
  VOCATIONAL = "VOCATIONAL",
  NONE = "NONE",
}

// export enum SponsershipType {
//   EDUCATIONAL = "EDUCATIONAL",
//   HEALTH = "HEALTH",
//   FINANCIAL = "FINANCIAL",
//   SOCIAL = "SOCIAL",
//   OTHER = "OTHER",
// }

export const SponsershipType = [
  { id: 1, type: 'HEALTH' },
  { id: 2, type: 'SOCIAL' },
  { id: 3, type: 'FINANCIAL' },
  { id: 4, type: 'EDUCATIONAL' },
  { id: 5, type: 'OTHER' },
];

export enum SychologicalHealthTypes {
  STABLE = "STABLE",

  UNSTABLE = "UNSTABLE",

  REQUIRES_COUNSELING = "REQUIRES_COUNSELING",

  REQUIRES_THERAPY = "REQUIRES_THERAPY",

  CRITICAL = "CRITICAL",

  OTHER = "OTHER",
}

export enum HealthStatus {
  GOOD = 'GOOD',

  WEAK = 'WEAK',

  POOR = 'POOR',
}