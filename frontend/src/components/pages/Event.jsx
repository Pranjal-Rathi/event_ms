import React, { useState } from "react";
import axios from "axios";

export const EventDetailsForm = () => {
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [updateEventId, setUpdateEventId] = useState("");
  const [updateEventType, setUpdateEventType] = useState("");
  const [updateEventNamePrev, setUpdateEventNamePrev] = useState("");
  const [updateEventNameNew, setUpdateEventNameNew] = useState("");
  const [deleteEventId, setDeleteEventId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/events", {
        event_type: eventType,
        event_name: eventName,
      });
      console.log("Event details submitted successfully");
      // Reset form
      setEventType("");
      setEventName("");
    } catch (error) {
      console.error("Error submitting event details:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:1337/events/${updateEventId}`,
        {
          event_type: updateEventType,
          new_event_name: updateEventNameNew,
          prev_event_name: updateEventNamePrev,
        }
      );
      console.log("Event details updated successfully");
      // Reset form
      setUpdateEventId("");
      setUpdateEventType("");
      setUpdateEventNamePrev("");
      setUpdateEventNameNew("");
    } catch (error) {
      console.error("Error updating event details:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:1337/events/${deleteEventId}`
      );
      console.log("Event deleted successfully");
      // Reset form
      setDeleteEventId("");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  
  return (
    <div className="form">
      <h1 style={{ color: "ORANGE" }}>EVENT DETAILS</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Event Type:
          <input
            type="text"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Submit Event Details</button>
      </form>

      <h1 style={{ color: "orange" }}>UPDATE EVENT</h1>
      <form onSubmit={handleUpdate}>
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
        <label>
          Event Type:
          <input
            type="text"
            value={updateEventType}
            onChange={(e) => setUpdateEventType(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Previous Event Name:
          <input
            type="text"
            value={updateEventNamePrev}
            onChange={(e) => setUpdateEventNamePrev(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          New Event Name:
          <input
            type="text"
            value={updateEventNameNew}
            onChange={(e) => setUpdateEventNameNew(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Update Event</button>
      </form>

      <h1 style={{ color: "orange" }}>DELETE EVENT</h1>
      <form onSubmit={handleDelete}>
        {/* <p>Event ID:</p> */}
        <label>
          Event ID: 
          <input
            type="text"
            value={deleteEventId}
            onChange={(e) => setDeleteEventId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Delete Event</button>
      </form>
    </div>
  );
}

export default EventDetailsForm;
