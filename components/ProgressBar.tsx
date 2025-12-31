"use client";

import { useEffect, useState } from "react";
import { SOFTCAP, INITIAL_FILLED_USD } from "../lib/presale";

export const ProgressBar = () => {
  const [total, setTotal] = useState<number>(INITIAL_FILLED_USD);
  const [mounted, setMounted] = useState(false);

  // SSR guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch sa backend-a
  const fetchTotal = async () => {
    try {
      const res = await fetch("https://php.veritynetwork.io/php_backend/get_purchases.php");
      const data = await res.json();
      const sum = data.reduce((acc: number, b: any) => acc + Number(b.amountUSD || 0), 0);
      setTotal(INITIAL_FILLED_USD + sum);
    } catch {
      setTotal(INITIAL_FILLED_USD);
    }
  };

  useEffect(() => {
    if (!mounted) return;

    fetchTotal();

    const handleUpdate = () => {
      fetchTotal();
    };

    window.addEventListener("presale_update", handleUpdate);
    return () => window.removeEventListener("presale_update", handleUpdate);
  }, [mounted]);

  if (!mounted) return null;

  const percent = Math.min((total / SOFTCAP) * 100, 100);

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ background: "#111d33", borderRadius: "8px", height: "20px", width: "300px" }}>
        <div
          style={{
            height: "100%",
            width: `${percent}%`,
            background: "linear-gradient(270deg, #4facfe, #00f2fe)",
            borderRadius: "8px",
            transition: "width 0.5s",
          }}
        />
      </div>
      <p>{total.toLocaleString()} / {SOFTCAP.toLocaleString()} USD</p>
    </div>
  );
};
