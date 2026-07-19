export interface GiftFilterDto {
  page: number;
  pageSize: number;

  name?: string;
  phone?: string;

  claimed?: boolean;
  used?: boolean;

  expirationStart?: string;
  expirationEnd?: string;
}