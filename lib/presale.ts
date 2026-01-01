export interface Buyer {
  wallet: string;
  amountUSD: number;
  referral?: string;
  stablecoin?: string;
  txSignature?: string; // dodato
}

export const SOFTCAP = 200_000;
export const INITIAL_FILLED_USD = 100_000;

/**
 * ADD BUYER → PHP backend
 */
export const addBuyer = async (
  wallet: string,
  amountUSD: number,
  referral?: string,
  stablecoin?: string,
  txSignature?: string
) => {
  const buyer: Buyer = { wallet, amountUSD, referral, stablecoin, txSignature };

  try {
    const res = await fetch(
      "https://php.veritynetwork.io/php_backend/add_purchases.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buyer),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to save purchase");
    }

    // Trigger local UI updates
    window.dispatchEvent(new Event("presale_update"));
  } catch (err) {
    console.error("Error saving purchase:", err);
  }
};

/**
 * TOTAL USD (ProgressBar)
 */
export const getTotalUSD = async () => {
  try {
    const res = await fetch(
      "https://php.veritynetwork.io/php_backend/get_purchases.php",
      { cache: "no-store" }
    );

    const data: Buyer[] = await res.json();

    return (
      INITIAL_FILLED_USD +
      data.reduce((sum, b) => sum + Number(b.amountUSD || 0), 0)
    );
  } catch {
    return INITIAL_FILLED_USD;
  }
};
