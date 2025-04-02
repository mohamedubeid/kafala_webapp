import dayjs from 'dayjs';
import {
  DisabilityTypes,
  MentalIllnessTypes,
  SychologicalHealthTypes,
  Gender,
  SponserConnection,
  SponsershipParty,
  SponsershipDuration,
  OrphanClassification,
  HealthStatus,
} from "./enm";

import {
  ChildEducationNotesDTO,
  ChildHealthNotesDTO,
  ChildMaritalNotesDTO,
  ChildNotesDTO,
  LastLevelOfEducation,
  NotesDTO,
} from "./note";
import { UserType } from "./user";

export type SponsershipTypesDTO = {
  type: string;
  relSponsershipTypes: RelSponsershipTypesDTO[];
};

export type RelSponsershipTypesDTO = {
  sponsershipType: SponsershipTypesDTO;
  childSponsorShip: ChildSponsorShipDTO;
};

export type ChildSponsorShipDTO = {
  id?: number;
  name?: string;
  sponserConnection?: SponserConnection;
  sponsershipParty?: SponsershipParty;
  sponsershipDuration?: SponsershipDuration;
  minimumCost?: number;
  child?: ChildDTO;
  childSponsorShipNotes?: ChildSponsorShipNotesDTO[];
  relSponsershipTypes?: RelSponsershipTypesDTO[];
};

export type ChildSponsorShipNotesDTO = {
  id?: number;
  notes?: NotesDTO;
  childSponsorShip?: ChildSponsorShipDTO;
};

export type ChildHealthStatusDTO = {
  id?: number;
  healthStatus?:HealthStatus | null;
  chronicDisease?: boolean;
  hasDisability?: boolean;
  disabilityType?: DisabilityTypes;
  disabilityImage?: string;
  hasMentalIllness?: boolean;
  mentalIllnessType?: MentalIllnessTypes;
  mentalIllnessImage?: string;
  sychologicalHealth?: boolean;
  sychologicalHealthType?: SychologicalHealthTypes;
  sychologicalHealthImage?: string;
  healthReport?: string;
  child?: ChildDTO;
  childHealthNotes?: ChildHealthNotesDTO[];
};

export type ChildDTO = {
  totalCost: number;
  id?: number;
  firstName?: string;
  imageUrl?: string | null;
  nationalId?: string;
  nationalImage?: string | null;
  birthCertificate?: string | null;
  email?: string;
  fatherName?: string;
  fatherPhone?: string;
  brotherCode?: string;
  motherName?: string;
  familyName?: string;
  gender?: Gender;
  age?: number;
  vedio?: string | null;
  description?: any;
  address?: string;
  user?: UserType;
  childNotes?: ChildNotesDTO[];
  childHealthStatus?: ChildHealthStatusDTO;
  childMaritalStatus?: ChildMaritalStatusDTO;
  childEducationStatus?: ChildEducationStatusDTO;
  childSponsorShip?: ChildSponsorShipDTO;
};

export type ChildSponsorShip = {
  id?: number;
  name?: string;
  sponserConnection?: SponserConnection;
  sponsershipParty?: SponsershipParty;
  sponsershipDuration?: SponsershipDuration;
  minimumCost?: number;
  child?: ChildDTO;
  childSponsorShipNotes?: ChildSponsorShipNotesDTO[];
  relSponsershipTypes?: RelSponsershipTypesDTO[];
};

export type ChildEducationStatusDTO = {
  id?: number;
  lastLevelOfEducation?: LastLevelOfEducation;
  hoppy?: string;
  lastLevelOfEducationImage?: string;
  child?: ChildDTO;
  childEducationNotes?: ChildEducationNotesDTO[];
};

export type ChildMaritalStatusDTO = {
  id?: number;
  orphanClassification?: OrphanClassification;
  fatherDateOfDeath?: dayjs.Dayjs | null;
  guardianName?: string | null;
  guardianNationalID?: string | null;
  guardianRelationship?: string | null;
  guardianDocument?: string | null;
  lostHousing?: boolean | null;
  lostLimbs?: boolean | null;
  lostSight?: boolean | null;
  losthearorspeak?: boolean | null;
  hasChronicDiseases?: boolean | null;
  dateOfBeathImage?: string;
  numOfSibiling?: number;
  child?: ChildDTO;
  childMaritalNotes?: ChildMaritalNotesDTO[];
};

export type AboutChild = {
  id?: number;
  name?: string;
  fatherName?: string;
  fatherPhone?: string;
  familyName?: string;
  imageUrl?: string;
  joiningDate?: string;
};

export type AboutChildList = {
  childsWithSponsorShip: AboutChild[];
  getChildsWithoutSponsorShips: AboutChild[];
};
