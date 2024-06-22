import React, { useState } from "react";
import axios from "axios";

export const AdminFeedbackForm = () => {
  const [feedbackId, setFeedbackId] = useState("");
  const [feedbackDetails, setFeedbackDetails] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:1337/feedbacks_admin",
        {
          params: {
            feedback_id: feedbackId,
          },
        }
      );
      console.log("Feedback details displayed successfully");
      setFeedbackDetails(response.data); // Set the response data in state
      console.log(1);
      console.log(response.data);
      console.log(2);
      // Reset form
      // setFeedbackId("");
    } catch (error) {
      console.error("Error displaying Feedback details:", error);
    }
  };

  return (
    <div className="form">
      <h1>ENTER FEEDBACK DETAILS</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Feedback ID:
          <input
            type="text"
            value={feedbackId}
            onChange={(e) => setFeedbackId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Show Feedback Details</button>
      </form>

      {/* {Array.isArray(feedbackDetails) && feedbackDetails.length > 0 ? (
        <ul>
          {feedbackDetails.map((feedback, index) => (
            <li key={index}>{feedback.Venue_name}</li>
          ))}
        </ul>
      ) : (
        <p>No feedback details to display</p>
      )} */}

      {Array.isArray(feedbackDetails) && feedbackDetails.length > 0 ? (
        <ul style={{ color: "white" }}>
          {feedbackDetails.map((feedback, index) => (
            <li key={index}>
              <strong>Feedback ID:</strong> {feedback.Feedback_id}
              <br />
              <strong>Booking ID:</strong> {feedback.Booking_id}
              <br />
              <strong>Comments:</strong> {feedback.Comments}
              <br />
              <strong>Rating:</strong> {feedback.Rating}
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback details to display</p>
      )}
    </div>
  );
};
