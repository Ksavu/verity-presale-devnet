"use client";

import { useMemo, useState } from "react";
import { Connection } from "@solana/web3.js";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

import { WalletConnect } from "../components/WalletConnect";
import { BuyPanel } from "../components/BuyPanel";
import { ProgressBar } from "../components/ProgressBar";
import NetworkNodes from "../components/NetworkNodes";
import AdminPanel from "../components/AdminPanel";

export default function Home() {
  const endpoint = useMemo(() => "https://api.devnet.solana.com", []);
  const connection = useMemo(() => new Connection(endpoint), [endpoint]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <MainContent connection={connection} />
    </WalletProvider>
  );
}

const MainContent = ({ connection }: { connection: Connection }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#0a0f25",
        minHeight: "100vh",
        width: "100%",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <NetworkNodes />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="Verity Logo"
          style={{ width: "150px", marginBottom: "30px" }}
        />
        <h1 style={{ marginBottom: "10px" }}>VERITY Presale</h1>
        <p style={{ marginBottom: "20px", fontSize: "18px" }}>1 $VTY = 1 USD</p>

        {/* Wallet Connect */}
        <WalletConnect onConnect={setWalletAddress} />

        {walletAddress && (
          <p style={{ color: "#4facfe", marginBottom: "20px" }}>
            Connected: {walletAddress}
          </p>
        )}

        <ProgressBar />
        <BuyPanel connection={connection} />
        <AdminPanel />
      </div>
    </div>
  );
};
