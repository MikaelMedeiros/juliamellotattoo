import { Gift } from "./gift.model";

export interface GiftPageDto {
  items: Gift[];
  total: number;
  page: number;
  pageSize: number;
}