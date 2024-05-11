import React, { useState } from "react";
import axios from "axios";

export const PaymentForm = () => {
  const [totalAmount, setTotalAmount] = useState("");
  const [taxes, setTaxes] = useState("");
  const [payType, setPayType] = useState("");
  const [payDate, setPayDate] = useState("");

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/payments", {
        totalAmount:totalAmount,
        taxes:taxes,
        payDate: payDate,
        payType: payType

      });
      console.log("Payment details submitted successfully");
      // Reset form
      setComment("");
      setRating("");
      setPayDate("");
      setPayType("");
    } catch (error) {
      console.error("Error submitting Payment details:", error);
    }
  };

  return (
    <div className="form">
      <h1 style={{ color: "orange" }}>PAYMENT FORM</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Total Amount:
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </label>
        <label>
          All Taxes:
          <input
            type="number"
            value={taxes}
            onChange={(e) => setTaxes(e.target.value)}
            required
          />
        </label>
        <label>
          Payment Type:
          <input
            type="text"
            value={payType}
            onChange={(e) => setPayType(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Payment Date:
          <input
            type="date"
            value={payDate}
            onChange={(e) => setPayDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

// export default PaymentForm;
