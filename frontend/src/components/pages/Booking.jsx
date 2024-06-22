import React, { useState } from "react";
import axios from "axios";

export const BookingDetailsForm = () => {
  const [customerId, setCustomerId] = useState("");
  const [venueName, setVenueName] = useState("");
  const [eventId, setEventId] = useState("");
  const [updateBookingId, setUpdateBookingId] = useState("");
  const [updateCustomerId, setUpdateCustomerId] = useState("");
  const [updateVenueName, setUpdateVenueName] = useState("");
  const [updateEventId, setUpdateEventId] = useState("");
  const [deleteBookingId, setDeleteBookingId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/bookings", {
        customer_id: customerId,
        venue_name: venueName,
        event_id: eventId,
      });
      console.log("Booking details submitted successfully");
      // Reset form
      setCustomerId("");
      setVenueName("");
      setEventId("");
    } catch (error) {
      console.error("Error submitting Booking details:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // const contactNumber = e.target.value;
    try {
      const response = await axios.put(`http://localhost:1337/bookings`, {
        booking_id: updateBookingId,
        customer_id: updateCustomerId,
        venue_name: updateVenueName,
        event_id: updateEventId,
      });
      console.log("Booking details updated successfully");
      // Reset form
      setUpdateBookingId("");
      setUpdateCustomerId("");
      setUpdateVenueName("");
      setUpdateEventId("");
    } catch (error) {
      console.error("Error updating Booking details:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:1337/bookings`, {
        data: {
          booking_id: deleteBookingId,
        },
      });
      console.log("Booking deleted successfully");
      // Reset form
      setDeleteBookingId("");
    } catch (error) {
      console.error("Error deleting Booking:", error);
    }
  };

  return (
    <div className="form">
      <h1>BOOKING DETAILS</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Customer ID:
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Venue Name:
          <input
            type="text"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Event ID:
          <input
            type="text"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Submit Booking Details</button>
      </form>

      <h1>UPDATE BOOKING</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Booking Id:
          <input
            type="text"
            value={updateBookingId}
            onChange={(e) => setUpdateBookingId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Customer ID:
          <input
            type="text"
            value={updateCustomerId}
            onChange={(e) => setUpdateCustomerId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Venue Name:
          <input
            type="text"
            value={updateVenueName}
            onChange={(e) => setUpdateVenueName(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Event ID:
          <input
            type="text"
            value={updateEventId}
            onChange={(e) => setUpdateEventId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Update Booking</button>
      </form>

      <h1>DELETE BOOKING</h1>
      <form onSubmit={handleDelete}>
        <label>
          Booking Id:
          <input
            type="text"
            value={deleteBookingId}
            onChange={(e) => setDeleteBookingId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Delete Booking</button>
      </form>
    </div>
  );
};
