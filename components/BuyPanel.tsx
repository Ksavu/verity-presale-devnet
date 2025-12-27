import { useState } from "react";
import { addBuyer } from "../lib/presale";

export const BuyPanel = () => {
  const [amount, setAmount] = useState(0);

  const handleBuy = () => {
    addBuyer("You", amount);
    alert(`You bought ${amount} USD worth of tokens!`);
    setAmount(0);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter USD amount"
        style={{ padding: "8px", marginRight: "8px" }}
      />
      <button onClick={handleBuy} style={{ padding: "8px 16px" }}>
        Buy
      </button>
    </div>
  );
};
