export interface Gift {
  id: string;
  name: string;
  phone: string;
  claimed: boolean;
  used: boolean;
  createdAt: string;
  expiresAt: string | null;
  claimedAt: string | null;
  usedAt: string | null;
}