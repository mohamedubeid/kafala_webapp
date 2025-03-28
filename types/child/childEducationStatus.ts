import { LastLevelOfEducation } from "../enm";
import { IChild } from "./profile";

export interface IChildEducationStatus {
  id?: number;
  lastLevelOfEducation?: keyof typeof LastLevelOfEducation | null;
  hoppy?: string | null;
  lastLevelOfEducationImage?: string | null;
  child?: IChild | null;
  childEducationNotes?: { id: number | null; notes: { id: number | null; note: string } }[];

}