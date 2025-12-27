"use client";
import { useState } from "react";

export const WalletConnect = ({ onConnect }: { onConnect: (wallet: string) => void }) => {
  const [wallet, setWallet] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const resp = await window.solana?.connect();
      const walletAddress = resp.publicKey.toString();
      setWallet(walletAddress);
      onConnect(walletAddress);
    } catch (err) {
      console.log("Wallet connect canceled or error", err);
    }
  };

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      {wallet ? (
        <p style={{ color: "#4facfe" }}>Connected wallet: <b>{wallet}</b></p>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            padding: "10px 20px",
            background: "linear-gradient(270deg, #4facfe, #00f2fe)",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};
