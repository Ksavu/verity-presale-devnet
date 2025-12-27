import { CONFIG } from "./config";

export interface Buyer {
  wallet: string;
  amountUSD: number;
  referral?: string;
  stablecoin?: string;
}

let buyers: Buyer[] = [];

export const getBuyers = () => buyers;

export const addBuyer = (
  wallet: string,
  amountUSD: number,
  referral?: string,
  stablecoin?: string
) => {
  buyers.push({ wallet, amountUSD, referral, stablecoin });
  window.dispatchEvent(new Event("presale_update"));
};

export const getTotalUSD = () => {
  return INITIAL_FILLED_USD + buyers.reduce((sum, b) => sum + b.amountUSD, 0);
};

export const SOFTCAP = 200_000;
export const MIN_BUY = 50;
export const MAX_BUY = 20_000;
export const INITIAL_FILLED_USD = 100_000;
