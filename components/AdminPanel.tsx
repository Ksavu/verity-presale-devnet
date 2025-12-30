"use client";

import { useEffect, useState } from "react";
import { Buyer } from "../lib/presale";

export default function AdminPanel() {
  const [highlight, setHighlight] = useState(false);
  const [buyers, setBuyers] = useState<Buyer[]>([]);

  // Fetch buyers sa backend-a
  const fetchBuyers = async () => {
    try {
      const res = await fetch(
        "https://buy.veritynetwork.io/php_backend/get_purchases.php"
      );
      const data: Buyer[] = await res.json();
      setBuyers(data);
    } catch (err) {
      console.error("Could not fetch buyers:", err);
    }
  };

  useEffect(() => {
    fetchBuyers();

    // Subscribe to new purchases event (local updates)
    const handleUpdate = () => fetchBuyers();
    window.addEventListener("presale_update", handleUpdate);
    return () => window.removeEventListener("presale_update", handleUpdate);
  }, []);

  // Animacija boja promo teksta
  useEffect(() => {
    const interval = setInterval(() => setHighlight((prev) => !prev), 1000);
    return () => clearInterval(interval);
  }, []);

  const getReferralColor = (code: string) => {
    const colors = ["#4facfe", "#00f2fe", "#ff6a00", "#ee0979", "#26A17B", "#1E90FF"];
    let hash = 0;
    for (let i = 0; i < code.length; i++) hash += code.charCodeAt(i);
    return colors[hash % colors.length];
  };

  const exportLeaderboard = () => {
    window.open(
      "https://buy.veritynetwork.io/php_backend/export_leaderboard.php",
      "_blank"
    );
  };

  const exportAdminCSV = () => {
    window.open(
      "https://buy.veritynetwork.io/php_backend/export_admin.php?wallet=7ALEjJAikbPcRcTRT6722UEa18tHLf5cnz72SABy5NUg",
      "_blank"
    );
  };

  return (
    <div
      style={{
        background: "#111d33",
        padding: "20px",
        borderRadius: "12px",
        width: "350px",
        color: "#fff",
        marginTop: "20px",
        textAlign: "center",
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
      }}
    >
      <h2>Verity Network</h2>
      <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5" }}>
        Unlock{" "}
        <span
          style={{
            color: highlight ? "#4facfe" : "#00f2fe",
            fontWeight: "bold",
            transition: "color 0.5s",
          }}
        >
          privileged access
        </span>{" "}
        to the Verity Network.
        <br />
        Be among the first to explore our decentralized ecosystem.
        <br />
        Early entry means{" "}
        <span
          style={{
            color: highlight ? "#ff6a00" : "#ee0979",
            fontWeight: "bold",
            transition: "color 0.5s",
          }}
        >
          exclusive opportunities
        </span>
        <br />
        Join now and experience the future of blockchain innovation.
      </p>

      {buyers.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            maxHeight: "200px",
            overflowY: "auto",
            borderTop: "1px solid #333",
            paddingTop: "10px",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Purchases</h3>
          {buyers.map((b, i) => (
            <div
              key={i}
              style={{
                padding: "6px 8px",
                borderBottom: "1px solid #333",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                borderRadius: "6px",
                background:
                  "linear-gradient(90deg, #111d33 25%, #1a2a50 50%, #111d33 75%)",
                backgroundSize: "200% 100%",
                transition: "background-position 0.5s",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = "100% 0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = "0 0")}
            >
              <span>
                {b.wallet.slice(0, 8)}...{b.wallet.slice(-4)}
              </span>
              <span>{b.amountUSD} USD</span>
              {b.referral && (
                <span style={{ color: getReferralColor(b.referral), fontWeight: "bold" }}>
                  {b.referral}
                </span>
              )}
            </div>
          ))}
          <button
            onClick={exportLeaderboard}
            style={{
              marginTop: "10px",
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
              background: "#4facfe",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Export Public Leaderboard
          </button>
          <button
            onClick={exportAdminCSV}
            style={{
              marginTop: "10px",
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
              background: "#26A17B",
              color: "#fff",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            Export Full CSV (Admin)
          </button>
        </div>
      )}
    </div>
  );
}
