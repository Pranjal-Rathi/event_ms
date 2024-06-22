import React, { useState } from "react";
import axios from "axios";

export const FeedbackDetailsForm = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [booking_id, setBookingId] = useState("");
  // const [booking_id, setBookingId] = useState("");
  const [updateFeedbackId, setUpdateFeedbackId] = useState("");
  const [updateBookingId, setUpdateBookingId] = useState("");
  const [updateFeedbackComment, setUpdateFeedbackComment] = useState("");
  const [updateFeedbackRating, setUpdateFeedbackRating] = useState("");
  const [deleteFeedbackId, setDeleteFeedbackId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/feedbacks", {
        comment: comment,
        rating: rating,
        booking_id: booking_id,
      });
      console.log("Feedback details submitted successfully");
      // Reset form
      setComment("");
      setRating("");
      setBookingId("");
    } catch (error) {
      console.error("Error submitting Feedback details:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:1337/feedbacks`, {
        comment: updateFeedbackComment,
        rating: updateFeedbackRating,
        feedback_id: updateFeedbackId,
        booking_id: updateBookingId,
      });
      console.log("Feedback details updated successfully");
      // Reset form
      setUpdateFeedbackId("");
      setUpdateFeedbackComment("");
      setUpdateFeedbackRating("");
      setUpdateBookingId("");
    } catch (error) {
      console.error("Error updating Feedback details:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:1337/feedbacks`, {
        data: {
          feedback_id: deleteFeedbackId,
        },
      });
      console.log("Feedback deleted successfully");
      // Reset form
      setDeleteFeedbackId("");
    } catch (error) {
      console.error("Error deleting feedback", error);
    }
  };

  return (
    <div className="form">
      <h1>FEEDBACK DETAILS</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Rating:
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Booking ID:
          <input
            type="text"
            value={booking_id}
            onChange={(e) => setBookingId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Submit Feedback Details</button>
      </form>

      <h1>UPDATE FEEDBACK</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Feedback ID:
          <input
            type="text"
            value={updateFeedbackId}
            onChange={(e) => setUpdateFeedbackId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Booking ID:
          <input
            type="text"
            value={updateBookingId}
            onChange={(e) => setUpdateBookingId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Comment:
          <input
            type="text"
            value={updateFeedbackComment}
            onChange={(e) => setUpdateFeedbackComment(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Rating:
          <input
            type="text"
            value={updateFeedbackRating}
            onChange={(e) => setUpdateFeedbackRating(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>

        <button type="submit">Update Feedback</button>
      </form>

      <h1>DELETE FEEDBACK</h1>
      <form onSubmit={handleDelete}>
        <label>
          Feedback ID:
          <input
            type="text"
            value={deleteFeedbackId}
            onChange={(e) => setDeleteFeedbackId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Delete Feedback</button>
      </form>
    </div>
  );
};

// export default FEEDBACKDetailsForm;
