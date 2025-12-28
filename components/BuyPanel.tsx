"use client";
import { useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";

export const BuyPanel = ({ connection }: { connection: any }) => {
  const { publicKey, sendTransaction, connected } = useWallet(); // koristimo useWallet direktno
  const [amount, setAmount] = useState<string>("");
  const [referral, setReferral] = useState<string>("");
  const [message, setMessage] = useState("");

  const USDT_MINT = new PublicKey(process.env.NEXT_PUBLIC_USDT_MINT!);
  const USDC_MINT = new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!);
  const PRESALE_WALLET = new PublicKey(process.env.NEXT_PUBLIC_PRESALE_WALLET!);

  const MIN_BUY = 50;
  const MAX_BUY = 20000;

  const handleBuy = async (stablecoin: "USDT" | "USDC") => {
    if (!connected || !publicKey) return; // neće pusta buy ako nije povezan
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return setMessage("Enter a valid amount");
    if (numericAmount < MIN_BUY) return setMessage(`Minimum purchase is $${MIN_BUY}`);
    if (numericAmount > MAX_BUY) return setMessage(`Maximum purchase is $${MAX_BUY}`);
    if (!referral.trim()) return setMessage("Referral code is required!");

    try {
      const mint = stablecoin === "USDT" ? USDT_MINT : USDC_MINT;
      const fromTokenAccount = await getAssociatedTokenAddress(mint, publicKey);
      const toTokenAccount = await getAssociatedTokenAddress(mint, PRESALE_WALLET);

      const tx = new Transaction().add(
        createTransferInstruction(
          fromTokenAccount,
          toTokenAccount,
          publicKey,
          numericAmount * 10 ** 6,
          [],
          TOKEN_PROGRAM_ID
        )
      );

      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, "confirmed");

      setMessage(`You bought $${numericAmount} $VTY with ${stablecoin}`);
      setAmount("");
      setReferral("");
    } catch (err: any) {
      console.error(err);
      setMessage("Transaction failed: " + err.message);
    }
  };

  return (
    <div style={{ background: "#111d33", padding: "30px", borderRadius: "12px", textAlign: "center", width: "320px", boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)", marginBottom: "20px" }}>
      <p style={{ marginBottom: "10px", fontSize: "14px", color: "#4facfe" }}>Minimum: ${MIN_BUY} — Maximum: ${MAX_BUY}</p>
      <input type="number" placeholder="Enter USD amount" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: "80%", padding: "8px", margin: "10px 0", borderRadius: "6px", border: "1px solid #4facfe" }} />
      <input type="text" placeholder="Referral code (required)" value={referral} onChange={(e) => setReferral(e.target.value)} style={{ width: "80%", padding: "8px", margin: "10px 0", borderRadius: "6px", border: "1px solid #4facfe" }} />

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
        <button 
          onClick={() => handleBuy("USDT")} 
          style={{ 
            padding: "8px 12px", 
            background: connected ? "#26A17B" : "#555", 
            border: "none", 
            borderRadius: "8px", 
            cursor: connected ? "pointer" : "not-allowed", 
            color: "#fff", 
            fontWeight: "bold", 
            display: "flex", 
            alignItems: "center", 
            gap: "5px" 
          }}
          disabled={!connected}
        >
          <img src="/usdt.png" alt="USDT" style={{ width: "16px", height: "16px" }} />
          Buy with USDT
        </button>
        <button 
          onClick={() => handleBuy("USDC")} 
          style={{ 
            padding: "8px 12px", 
            background: connected ? "#1E90FF" : "#555", 
            border: "none", 
            borderRadius: "8px", 
            cursor: connected ? "pointer" : "not-allowed", 
            color: "#fff", 
            fontWeight: "bold", 
            display: "flex", 
            alignItems: "center", 
            gap: "5px" 
          }}
          disabled={!connected}
        >
          <img src="/usdc.png" alt="USDC" style={{ width: "16px", height: "16px" }} />
          Buy with USDC
        </button>
      </div>

      {message && <p style={{ marginTop: "15px", color: "#4facfe" }}>{message}</p>}
    </div>
  );
};
