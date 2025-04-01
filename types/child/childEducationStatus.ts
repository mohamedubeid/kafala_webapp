import { ChildDTO } from "../child";
import { LastLevelOfEducation } from "../enm";

export interface IChildEducationStatus {
  id?: number;
  lastLevelOfEducation?: keyof typeof LastLevelOfEducation | null;
  hoppy?: string | null;
  lastLevelOfEducationImage?: string | null;
  child?: ChildDTO | null;
  childEducationNotes?: { id: number | null; notes: { id: number | null; note: string } }[];

}