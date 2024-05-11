import React, { useState } from "react";
import axios from "axios";

export const VenueDetailsForm = () => {
  
  const [venueType, setVenueType] = useState("");
  const [venueName, setVenueName] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState("");
  const [updateVenueId, setUpdateVenueId] = useState("");
  const [updateVenueName, setUpdateVenueName] = useState("");
  const [updateVenueTypeOld, setUpdateVenueTypeOld] = useState("");
  const [updateVenueTypeNew, setUpdateVenueTypeNew] = useState("");
  const [updateLocation, setUpdateLocation] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [updateCapacity, setUpdateCapacity] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [deleteVenueId, setDeleteVenueId] = useState("");
  const [deleteVenueType, setDeleteVenueType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/venues", {
        venueType:venueType,
        venueName: venueName,
        location: location,
        time: time,
        capacity: capacity,
        date: date,
      });
      console.log("Venue details submitted successfully");
      // Reset form
      setVenueName("");
      setLocation("");
      setTime("");
      setCapacity("");
      setDate("");
    } catch (error) {
      console.error("Error submitting Venue details:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:1337/venues/${updateVenueId}`,
        {
          venueType: updateVenueTypeOld,
          venueType: updateVenueTypeNew,
          venueName: updateVenueName,
          location: updateLocation,
          time: updateTime,
          capacity: updateCapacity,
          date: updateDate,
        }
      );
      console.log("Venue details updated successfully");
      // Reset form
      setUpdateVenueTypeNew("")
      setUpdateVenueId("");
      setUpdateVenueName("");
      setUpdateLocation("");
      setUpdateTime("");
      setUpdateCapacity("");
      setUpdateDate("");
    } catch (error) {
      console.error("Error updating Venue details:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:1337/venues/${deleteVenueId}`
      );
      console.log("Venue deleted successfully");
      // Reset form
      setDeleteVenueId("");
      setDeleteVenueType("");
    } catch (error) {
      console.error("Error deleting Venue", error);
    }
  };

  return (
    <div className="form">
      <h1 style={{ color: "ORANGE" }}>VENUE DETAILS</h1>
      <form onSubmit={handleSubmit}>
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
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Time:
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Capacity:
          <input
            type="text"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Submit Venue Details</button>
      </form>

      <h1 style={{ color: "orange" }}>UPDATE VENUE</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Venue ID:
          <input
            type="text"
            value={updateVenueId}
            onChange={(e) => setUpdateVenueId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Updated Venue Name:
          <input
            type="text"
            value={updateVenueName}
            onChange={(e) => setUpdateVenueName(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Updated Location:
          <input
            type="text"
            value={updateLocation}
            onChange={(e) => setUpdateLocation(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Updated Time:
          <input
            type="text"
            value={updateTime}
            onChange={(e) => setUpdateTime(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Updated Capacity:
          <input
            type="text"
            value={updateCapacity}
            onChange={(e) => setUpdateCapacity(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Updated Date:
          <input
            type="date"
            value={updateDate}
            onChange={(e) => setUpdateDate(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Update Venue</button>
      </form>

      <h1 style={{ color: "orange" }}>DELETE VENUE</h1>
      <form onSubmit={handleDelete}>
        <label>
          Venue ID:
          <input
            type="text"
            value={deleteVenueId}
            onChange={(e) => setDeleteVenueId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Delete Venue</button>
      </form>
    </div>
  );
};


// export default VenueDetailsForm;
