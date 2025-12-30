"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";

// Dinamički uvoz WalletMultiButton da radi samo na client-u
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

interface WalletConnectProps {
  onConnect?: (address: string | null) => void;
}

export const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const { publicKey, connected } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (onConnect) onConnect(publicKey ? publicKey.toBase58() : null);
  }, [publicKey, connected, onConnect]);

  if (!mounted) return null;

  return (
    <div style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}>
      <WalletMultiButton
        style={{
          padding: "10px 20px",
          backgroundColor: "#4facfe",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      />
    </div>
  );
};
