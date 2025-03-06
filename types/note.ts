import {
  ChildDTO,
  ChildEducationStatusDTO,
  ChildHealthStatusDTO,
  ChildMaritalStatusDTO,
  ChildSponsorShipNotesDTO,
} from "./child";

export enum LastLevelOfEducation {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  TERTIARY = "TERTIARY",
  VOCATIONAL = "VOCATIONAL",
  NONE = "NONE",
}

export type ChildNotesDTO = {
  id?: number;
  notes?: NotesDTO;
  child?: ChildDTO;
};

export type NotesDTO = {
  id?: number;
  note?: any;
  childHealthNotes?: ChildHealthNotesDTO;
  childMaritalNotes?: ChildMaritalNotesDTO;
  childEducationNotes?: ChildEducationNotesDTO;
  childSponsorShipNotes?: ChildSponsorShipNotesDTO;
  childNotes?: ChildNotesDTO;
};

export type ChildHealthNotesDTO = {
  id?: number;
  notes?: NotesDTO;
  childHealthStatus?: ChildHealthStatusDTO;
};

export type ChildEducationNotes = {
  id?: number;
  notes?: NotesDTO;
  childEducationStatus?: ChildEducationStatusDTO;
};

export type ChildEducationNotesDTO = {
  id?: number;
  notes?: NotesDTO;
  childEducationStatus?: ChildEducationStatusDTO;
};

export type ChildMaritalNotesDTO = {
  id?: number;
  notes?: NotesDTO;
  childMaritalStatus?: ChildMaritalStatusDTO;
};
