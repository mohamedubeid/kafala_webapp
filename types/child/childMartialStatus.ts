import { OrphanClassification } from "../enm";
import dayjs from 'dayjs';
import { IChild } from "./profile";

export interface IChildMaritalStatus {
  id?: number;
  orphanClassification?: keyof typeof OrphanClassification | null;
  fatherDateOfDeath?: dayjs.Dayjs | null;
  guardianName?: string | null;
  guardianNationalID?: string | null;
  guardianRelationship?: string | null;
  guardianDocument?: string | null;
  dateOfBeathImage?: string | null;
  numOfSibiling?: number | null;
  lostHousing?: boolean | null;
  lostLimbs?: boolean | null;
  lostSight?: boolean | null;
  losthearorspeak?: boolean | null;
  hasChronicDiseases?: boolean | null;
  child?: IChild | null;
  childMaritalNotes:  { id: number | null; notes: { id: number | null; note: string } }[];
}
