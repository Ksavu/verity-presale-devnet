"use client";
import { useState } from "react";
import { addBuyer, MIN_BUY, MAX_BUY } from "../lib/presale";

export const BuyPanel = ({ wallet }: { wallet: string | null }) => {
  const [amount, setAmount] = useState<string>("");
  const [referral, setReferral] = useState<string>("");
  const [message, setMessage] = useState("");

  const handleBuy = (stablecoin: string) => {
    if (!wallet) return setMessage("Connect wallet first!");
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return setMessage("Enter a valid amount");
    if (numericAmount < MIN_BUY) return setMessage(`Minimum purchase is $${MIN_BUY}`);
    if (numericAmount > MAX_BUY) return setMessage(`Maximum purchase is $${MAX_BUY}`);
    if (!referral.trim()) return setMessage("Referral code is required!");

    addBuyer(wallet, numericAmount, referral);

    setMessage(`You bought $${numericAmount} $VTY with ${stablecoin}`);
    setAmount("");
    setReferral("");
  };

  return (
    <div style={{
      background: "#111d33",
      padding: "30px",
      borderRadius: "12px",
      textAlign: "center",
      width: "320px",
      boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
      marginBottom: "20px"
    }}>
      <p style={{ marginBottom: "10px", fontSize: "14px", color: "#4facfe" }}>
        Minimum: ${MIN_BUY} — Maximum: ${MAX_BUY}
      </p>

      <input
        type="number"
        placeholder="Enter USD amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "80%", padding: "8px", margin: "10px 0", borderRadius: "6px", border: "1px solid #4facfe" }}
      />

      <input
        type="text"
        placeholder="Referral code (required)"
        value={referral}
        onChange={(e) => setReferral(e.target.value)}
        style={{ width: "80%", padding: "8px", margin: "10px 0", borderRadius: "6px", border: "1px solid #4facfe" }}
      />

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
        <button
          onClick={() => handleBuy("USDT")}
          style={{ padding: "8px 12px", background: "#26A17B", border: "none", borderRadius: "8px", cursor: "pointer", color: "#fff", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}
        >
          <img src="/usdt.png" alt="USDT" style={{ width: "16px", height: "16px" }} />
          Buy with USDT
        </button>

        <button
          onClick={() => handleBuy("USDC")}
          style={{ padding: "8px 12px", background: "#1E90FF", border: "none", borderRadius: "8px", cursor: "pointer", color: "#fff", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}
        >
          <img src="/usdc.png" alt="USDC" style={{ width: "16px", height: "16px" }} />
          Buy with USDC
        </button>
      </div>

      {message && <p style={{ marginTop: "15px", color: "#4facfe" }}>{message}</p>}
    </div>
  );
};
