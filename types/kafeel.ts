import { ChildDTO } from "./child";
import { SponsershipDuration } from "./enm";
import { UserType } from "./user";

export type RelChildKafeels = {
  duration: SponsershipDuration;
  cost: number;
  expirationDate?: Date;
  startDate?: Date;
  child: ChildDTO;
  kafeel: KafeelDTO;
  numberOfTimes?: number;
};
export type KafeelDTO = {
  user?: UserType;
  relChildKafeels?: RelChildKafeels[];
};
