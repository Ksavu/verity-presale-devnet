import { useEffect, useState } from "react";
import { getBuyers, Buyer } from "../lib/presale";

export default function AdminPanel() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);

  const refresh = () => {
    setBuyers(getBuyers());
  };

  useEffect(() => {
    refresh();
    window.addEventListener("presale_update", refresh);
    return () => window.removeEventListener("presale_update", refresh);
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      {buyers.map((b, i) => (
        <div key={i}>
          {b.address} — {b.amountUSD} USD
        </div>
      ))}
    </div>
  );
}
