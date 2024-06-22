import React, { useState } from "react";
import axios from "axios";

export const PaymentForm = () => {
  const [totalAmount, setTotalAmount] = useState("");
  const [bookingID, setBookingID] = useState("");
  const [serviceID, setServiceID] = useState("");
  const [taxes, setTaxes] = useState("");
  const [payType, setPayType] = useState("");
  const [payDate, setPayDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/payments", {
        total_amount: totalAmount,
        booking_id: bookingID,
        service_id: serviceID,
        taxes: taxes,
        payment_type: payType,
        payment_date: payDate,
      });
      console.log("Payment details submitted successfully");
      // Reset form
      setTotalAmount("");
      setBookingID("");
      setServiceID("");
      setTaxes("");
      setPayType("");
      setPayDate("");
    } catch (error) {
      console.error("Error submitting Payment details:", error);
    }
  };

  return (
    <div className="form">
      <h1>PAYMENT FORM</h1>
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
          Booking ID:
          <input
            type="text"
            value={bookingID}
            onChange={(e) => setBookingID(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Service ID:
          <input
            type="text"
            value={serviceID}
            onChange={(e) => setServiceID(e.target.value)}
            required
            style={{ color: "black" }}
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
};

// export default PaymentForm;
