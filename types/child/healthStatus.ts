import { ChildDTO } from "../child";
import { HealthStatus, DisabilityTypes, MentalIllnessTypes, SychologicalHealthTypes } from "../enm";

export interface IChildHealthStatus {
  id?: number;
  healthStatus?: keyof typeof HealthStatus | null;
  chronicDisease?: boolean | null;
  hasDisability?: boolean | null;
  disabilityType?: keyof typeof DisabilityTypes | null;
  disabilityImage?: string | null;
  hasMentalIllness?: boolean | null;
  mentalIllnessType?: keyof typeof MentalIllnessTypes | null;
  mentalIllnessImage?: string | null;
  sychologicalHealth?: boolean | null;
  sychologicalHealthType?: keyof typeof SychologicalHealthTypes | null;
  sychologicalHealthImage?: string | null;
  healthReport?: string | null;
  child?: ChildDTO | null;
  childHealthNotes?: { id: number | null; notes: { id: number | null; note: string } }[];
}