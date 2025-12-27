export const CONFIG = {
  rpcUrl: process.env.NEXT_PUBLIC_SOLANA_NETWORK || "https://api.devnet.solana.com",
  presaleWallet: process.env.NEXT_PUBLIC_PRESALE_WALLET || "",
  usdtMint: process.env.NEXT_PUBLIC_USDT_MINT || "",
  usdcMint: process.env.NEXT_PUBLIC_USDC_MINT || "",
};
