"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface WalletConnectProps {
  onConnect?: (address: string) => void;
}

export const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const { connected, publicKey, connect, disconnect } = useWallet();
  const [status, setStatus] = useState<string>("Connect Wallet");

  useEffect(() => {
    if (connected && publicKey) {
      setStatus("Disconnect Wallet");
      if (onConnect) onConnect(publicKey.toBase58());
    } else {
      setStatus("Connect Wallet");
      if (onConnect) onConnect("");
    }
  }, [connected, publicKey, onConnect]);

  const handleClick = async () => {
    try {
      if (connected) {
        await disconnect();
      } else {
        await connect();
      }
    } catch (err: any) {
      console.error("Wallet connection error:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px 20px",
        background: "#4facfe",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        marginBottom: "20px",
      }}
    >
      {status}
    </button>
  );
};
