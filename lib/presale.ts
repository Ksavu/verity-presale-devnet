import { CONFIG } from "./config";

export type Buyer = {
  address: string;
  amountUSD: number;
};

const STORAGE_KEY = "verity_buyers";

const getStoredBuyers = (): Buyer[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveBuyers = (buyers: Buyer[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(buyers));
  window.dispatchEvent(new Event("presale_update"));
};

export const getBuyers = (): Buyer[] => {
  return getStoredBuyers();
};

export const getTotalUSD = (): number => {
  return getStoredBuyers().reduce((sum, b) => sum + b.amountUSD, 0);
};

export const addBuyer = (address: string, amountUSD: number) => {
  const buyers = getStoredBuyers();
  buyers.push({ address, amountUSD });
  saveBuyers(buyers);
};
