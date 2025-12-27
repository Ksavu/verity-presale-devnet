import { WalletConnect } from "../components/WalletConnect";
import { BuyPanel } from "../components/BuyPanel";
import { ProgressBar } from "../components/ProgressBar";
import AdminPanel from "../components/AdminPanel";

export default function Home() {
  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <img src="/logo.jpg" alt="Verity Logo" style={{ width: "200px", marginBottom: "20px" }} />
      <h1>Verity Presale</h1>
      <WalletConnect />
      <ProgressBar />
      <BuyPanel />
      <AdminPanel />
    </div>
  );
}
