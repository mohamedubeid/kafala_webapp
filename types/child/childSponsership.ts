import { ChildDTO } from "../child";
import { SponserConnection, SponsershipDuration, SponsershipParty } from "../enm";

export interface IChildSponsorShip {
  id?: number;
  name?: string | null;
  sponserConnection?: keyof typeof SponserConnection | null;
  sponsershipParty?: keyof typeof SponsershipParty | null;
  sponsershipDuration?: keyof typeof SponsershipDuration | null;
  minimumCost?: number | null;
  child?: ChildDTO | null;
  childSponsorShipNotes?: { id: number | null; notes: { id: number | null; note: string } }[];
  relSponsershipTypes: any[];
}