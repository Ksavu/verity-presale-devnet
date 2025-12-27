import { useState } from "react";

export const WalletConnect = () => {
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);

  const connectWallet = () => {
    // Simulacija walleta
    setWallet("DevnetWallet123...");
    setConnected(true);
  };

  return (
    <div>
      {connected ? (
        <div>Connected: {wallet}</div>
      ) : (
        <button onClick={connectWallet} style={{ padding: "8px 16px" }}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};
