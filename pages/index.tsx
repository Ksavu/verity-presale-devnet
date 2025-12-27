"use client";
import { useState } from "react";
import NetworkNodes from "../components/NetworkNodes";
import { WalletConnect } from "../components/WalletConnect";
import { ProgressBar } from "../components/ProgressBar";
import { BuyPanel } from "../components/BuyPanel";
import AdminPanel from "../components/AdminPanel";

export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#0a0f25", minHeight: "100vh", width: "100%", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", overflow: "hidden", padding: "20px" }}>
      <NetworkNodes />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "500px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src="/logo.png" alt="Verity Logo" style={{ width: "150px", marginBottom: "30px" }} />
        <h1 style={{ marginBottom: "10px" }}>VERITY Presale</h1>
        <p style={{ marginBottom: "30px", fontSize: "18px" }}>1 $VTY = 1 USD</p>
        <WalletConnect onConnect={setWallet} />
        <ProgressBar />
        <BuyPanel wallet={wallet} />
        <AdminPanel />
      </div>
    </div>
  );
}
