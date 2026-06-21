export interface Gift {
  id: string;
  createdAt: string;
  claimed: boolean;
  claimedAt?: string;
  used: boolean;
  usedAt?: string;
  expiresAt?: string;
  name?: string;
  phone?: string;
}