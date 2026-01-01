"use client";

import { useEffect, useState } from "react";
import { Buyer } from "../lib/presale";

export default function AdminPanel() {
  const [highlight, setHighlight] = useState(false);
  const [buyers, setBuyers] = useState<Buyer[]>([]);

  // Fetch buyers
  const fetchBuyers = async () => {
    try {
      const res = await fetch(
        "https://php.veritynetwork.io/php_backend/get_purchases.php",
        { cache: "no-store" }
      );
      const data = await res.json();
      setBuyers(Array.isArray(data) ? data : []);
    } catch {
      setBuyers([]);
    }
  };

  useEffect(() => {
    fetchBuyers();
    const handleUpdate = () => fetchBuyers();
    window.addEventListener("presale_update", handleUpdate);
    return () => window.removeEventListener("presale_update", handleUpdate);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setHighlight((p) => !p), 1000);
    return () => clearInterval(interval);
  }, []);

  // === TOP REFERRALS ===
  const referralTotals = buyers.reduce<Record<string, number>>((acc, b) => {
    if (!b.referral) return acc;
    acc[b.referral] = (acc[b.referral] || 0) + b.amountUSD;
    return acc;
  }, {});

  const topReferrals = Object.entries(referralTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

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
      <style>{`
        @keyframes goldGlow {
          0% { box-shadow: 0 0 6px rgba(250, 204, 21, 0.4); }
          50% { box-shadow: 0 0 18px rgba(250, 204, 21, 0.9); }
          100% { box-shadow: 0 0 6px rgba(250, 204, 21, 0.4); }
        }
      `}</style>

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
      </p>

      {/* === TOP REFERRALS === */}
      {topReferrals.length > 0 && (
        <div
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "10px",
            background: "#0b162b",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>🏆 Top Referrals</h3>

          {topReferrals.map(([code, total], i) => {
            const medals = ["🥇", "🥈", "🥉"];
            const colors = ["#facc15", "#cbd5e1", "#cd7f32"];

            return (
              <div
                key={code}
                style={{
                  padding: "6px 10px",
                  marginBottom: "6px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#111d33",
                  color: colors[i],
                  fontWeight: "bold",
                  animation: i === 0 ? "goldGlow 2s infinite" : "none",
                }}
              >
                <span>
                  {medals[i]} {code}
                </span>
                <span>${total}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* === PURCHASES === */}
      {buyers.length > 0 && (
        <div
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            borderTop: "1px solid #333",
            paddingTop: "10px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Purchases</h3>

          {buyers.map((b, i) => (
            <div
              key={i}
              style={{
                padding: "6px 8px",
                borderBottom: "1px solid #333",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
              }}
            >
              <span>
                {b.wallet.slice(0, 6)}...{b.wallet.slice(-4)}
              </span>
              <span>{b.amountUSD} USD</span>
              {b.referral && <span>{b.referral}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
