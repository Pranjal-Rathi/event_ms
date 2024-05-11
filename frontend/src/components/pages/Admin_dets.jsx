import React, { useState } from "react";
import axios from "axios";

export const AdminDetailsForm = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminContactNumber, setAdminContactNumber] = useState("");
  const [updateAdminId, setUpdateAdminId] = useState("");
  const [updateAdminUsername, setUpdateAdminUsername] = useState("");
  const [updateAdminEmail, setUpdateAdminEmail] = useState("");
  const [updateAdminContactNumber, setUpdateAdminContactNumber] =
    useState("");
  const [deleteAdminId, setDeleteAdminId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/admins", {
        admin_username: adminUsername,
        admin_email: adminEmail,
        admin_contact_number: adminContactNumber,
      });
      console.log("admin details submitted successfully");
      // Reset form
      setAdminUsername("");
      setAdminEmail("");
      setAdminContactNumber("");
    } catch (error) {
      console.error("Error submitting admin details:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:1337/admins/${updateAdminId}`,
        {
          admin_username: updateAdminUsername,
          admin_email: updateAdminEmail,
          admin_contact_number: updateAdminContactNumber,
        }
      );
      console.log("admin details updated successfully");
      // Reset form
      setUpdateAdminId("");
      setUpdateAdminUsername("");
      setUpdateAdminEmail("");
      setUpdateAdminContactNumber("");
    } catch (error) {
      console.error("Error updating admin details:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:1337/admins/${deleteAdminId}`
      );
      console.log("admin deleted successfully");
      // Reset form
      setDeleteAdminId("");
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <div className="form">
      <h1 style={{ color: "ORANGE" }}>ADMIN DETAILS</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Contact Number:
          <input
            type="text"
            value={adminContactNumber}
            onChange={(e) => setAdminContactNumber(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Submit Admin Details</button>
      </form>

      <h1 style={{ color: "orange" }}>UPDATE ADMIN</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Admin ID:
          <input
            type="text"
            value={updateAdminId}
            onChange={(e) => setUpdateAdminId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Updated Username:
          <input
            type="text"
            value={updateAdminUsername}
            onChange={(e) => setUpdateAdminUsername(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Updated Email:
          <input
            type="email"
            value={updateAdminEmail}
            onChange={(e) => setUpdateAdminEmail(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Updated Contact Number:
          <input
            type="text"
            value={updateAdminContactNumber}
            onChange={(e) => setUpdateAdminContactNumber(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Update Admin</button>
      </form>

      <h1 style={{ color: "orange" }}>DELETE ADMIN</h1>
      <form onSubmit={handleDelete}>
        <label>
          Admin ID:
          <input
            type="text"
            value={deleteAdminId}
            onChange={(e) => setDeleteAdminId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Delete Admin</button>
      </form>
    </div>
  );
};
