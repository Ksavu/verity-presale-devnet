export interface Buyer {
  wallet: string;
  amountUSD: number;
  referral?: string;
  stablecoin?: string;
}

export const SOFTCAP = 200_000;
export const INITIAL_FILLED_USD = 100_000;

let buyers: Buyer[] = [];

export const loadBuyers = () => buyers;
export const saveBuyers = () => {};

export const getBuyers = () => buyers;

export const addBuyer = async (
  wallet: string,
  amountUSD: number,
  referral?: string,
  stablecoin?: string
) => {
  const buyer: Buyer = { wallet, amountUSD, referral, stablecoin };
  buyers.push(buyer);

  // Trigger local UI update
  const event = new CustomEvent("presale_update", { detail: buyer });
  window.dispatchEvent(event);

  // Send purchase to PHP backend
  try {
    await fetch("https://php.veritynetwork.io/php_backend/add_purchase.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buyer),
    });
  } catch (err) {
    console.error("Backend error:", err);
  }
};

export const getTotalUSD = async () => {
  try {
    const res = await fetch(
      "https://php.veritynetwork.io/php_backend/get_purchases.php"
    );
    const data: Buyer[] = await res.json();
    return INITIAL_FILLED_USD + data.reduce((sum, b) => sum + b.amountUSD, 0);
  } catch {
    return INITIAL_FILLED_USD;
  }
};
