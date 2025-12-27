import { useEffect, useState } from "react";
import { getTotalUSD } from "../lib/presale";
import { CONFIG } from "../lib/config";

export const ProgressBar = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotal(getTotalUSD());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const percent = Math.min((total / CONFIG.softcapUSD) * 100, 100);

  return (
    <div style={{ width: "100%", background: "#111d33", borderRadius: "8px", overflow: "hidden", margin: "10px 0" }}>
      <div
        style={{
          width: `${percent}%`,
          height: "24px",
          background: "linear-gradient(270deg, #4facfe, #00f2fe, #4facfe)",
          backgroundSize: "600% 600%",
          animation: "gradientAnim 3s ease infinite",
          textAlign: "center",
          color: "white",
          lineHeight: "24px",
          fontWeight: "bold",
        }}
      >
        {total.toLocaleString()} / {CONFIG.softcapUSD.toLocaleString()} USD
      </div>
    </div>
  );
};
