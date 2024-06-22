import React, { useState } from "react";
import axios from "axios";

export const ServiceDetailsForm = () => {
  const [serviceName, setServiceName] = useState("");
  const [updateServiceId, setUpdateServiceId] = useState("");
  const [updateServiceName, setUpdateServiceName] = useState("");
  const [deleteServiceId, setDeleteServiceId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/services", {
        service_name: serviceName,
      });
      console.log("Service details submitted successfully");
      // Reset form
      setServiceName("");
    } catch (error) {
      console.error("Error submitting service details:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:1337/services/`, {
        service_id: updateServiceId,
        service_name: updateServiceName,
      });
      console.log("Service details updated successfully");
      // Reset form
      setUpdateServiceId("");
      setUpdateServiceName("");
    } catch (error) {
      console.error("Error updating service details:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:1337/services`, {
        data: {
          service_id: deleteServiceId,
        },
      });
      console.log("Service deleted successfully");
      // Reset form
      setDeleteServiceId("");
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="form">
      <h1>SERVICE DETAILS</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Service Name:
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Submit Service Details</button>
      </form>

      <h1>UPDATE SERVICE</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Service ID:
          <input
            type="text"
            value={updateServiceId}
            onChange={(e) => setUpdateServiceId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Updated Service Name:
          <input
            type="text"
            value={updateServiceName}
            onChange={(e) => setUpdateServiceName(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Update Service</button>
      </form>

      <h1>DELETE SERVICE</h1>
      <form onSubmit={handleDelete}>
        <label>
          Service ID:
          <input
            type="text"
            value={deleteServiceId}
            onChange={(e) => setDeleteServiceId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Delete Service</button>
      </form>
    </div>
  );
};

// export default ServiceDetailsForm;
