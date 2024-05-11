import React, { useState } from "react";
import axios from "axios";

export const FeedbackDetailsForm = () => {
  const [comment, setcomment] = useState("");
  const [rating, setRating] = useState("");
  const [updateFeedbackId, setUpdateFeedbackId] = useState("");
  const [updateFeedbackComment, setUpdateFeedbackComment] = useState("");
  const [updateFeedbackRating, setUpdateFeedbackRating] = useState("");
  const [deleteFeedbackId, setDeleteFeedbackId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/feedbacks", {
        comment:comment,
        rating: rating,
      });
      console.log("Feedback details submitted successfully");
      // Reset form
      setComment("");
      setRating("");
    } catch (error) {
      console.error("Error submitting Feedback details:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:1337/feedbacks/${updateFeedbackId}`,
        {
          comment: updateFeedbackComment,
          rating: updateFeedbackRating,
        }
      );
      console.log("Feedback details updated successfully");
      // Reset form
      setUpdateFeedbackId("");
      setUpdateComment("");
      setUpdateRating("");
    } catch (error) {
      console.error("Error updating Feedback details:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:1337/feedbacks/${deleteFeedbackId}`
      );
      console.log("Feedback deleted successfully");
      // Reset form
      setDeleteFeedbackId("");
    } catch (error) {
      console.error("Error deleting feedback", error);
    }
  };

  return (
    <div className="form">
      <h1 style={{ color: "ORANGE" }}>FEEDBACK DETAILS</h1>
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
        <button type="submit">Submit Feedback Details</button>
      </form>

      <h1 style={{ color: "orange" }}>UPDATE FEEDBACK</h1>
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
          Comment:
          <input
            type="text"
            value={updateFeedbackComment}
            onChange={(e) => setUpdateComment(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Rating:
          <input
            type="text"
            value={updateFeedbackRating}
            onChange={(e) => setUpdateRating(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>

        <button type="submit">Update Feedback</button>
      </form>

      <h1 style={{ color: "orange" }}>DELETE FEEDBACK</h1>
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
