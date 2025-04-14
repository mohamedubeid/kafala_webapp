import { ChildDTO } from "./child";

export type ChildTransactionReportDTO = {
  createdDate: Date;
  image: string;
  video: string;
  amount_received: number;
  desceription: string;
  child: ChildDTO;
  id?: number;
}
