import React, { useState } from "react";
import axios from "axios";

export const CustomerDetailsForm = () => {
  const [customerUsername, setCustomerUsername] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerContactNumber, setCustomerContactNumber] = useState("");
  const [updateCustomerId, setUpdateCustomerId] = useState("");
  const [updateCustomerUsername, setUpdateCustomerUsername] = useState("");
  const [updateCustomerEmail, setUpdateCustomerEmail] = useState("");
  const [updateCustomerContactNumber, setUpdateCustomerContactNumber] =
    useState("");
  const [deleteCustomerId, setDeleteCustomerId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/customers", {
        customer_username: customerUsername,
        customer_email: customerEmail,
        customer_contact_number: customerContactNumber,
      });
      console.log("Customer details submitted successfully");
      // Reset form
      setCustomerUsername("");
      setCustomerEmail("");
      setCustomerContactNumber("");
    } catch (error) {
      console.error("Error submitting customer details:", error);
    }
  };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const updatedData = {};
  //     if (updateCustomerUsername !== "") {
  //       updatedData.customer_username = updateCustomerUsername;
  //     }
  //     if (updateCustomerEmail !== "") {
  //       updatedData.customer_email = updateCustomerEmail;
  //     }
  //     if (updateCustomerContactNumber !== "") {
  //       updatedData.customer_contact_number = updateCustomerContactNumber;
  //     }
  //     if (Object.keys(updatedData).length === 0) {
  //       console.log("No new data entered, nothing to update");
  //       return;
  //     }

  //     const response = await axios.put(
  //       `http://localhost:1337/customers/${updateCustomerId}`,
  //       updatedData
  //     );
  //     console.log("Customer details updated successfully");
  //     // Reset form
  //     setUpdateCustomerId("");
  //     setUpdateCustomerUsername("");
  //     setUpdateCustomerEmail("");
  //     setUpdateCustomerContactNumber("");
  //   } catch (error) {
  //     console.error("Error updating customer details:", error);
  //   }
  // };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:1337/customers`, {
        customer_id: updateCustomerId,
        customer_username: updateCustomerUsername,
        customer_email: updateCustomerEmail,
        customer_contact_number: updateCustomerContactNumber,
      });
      console.log("Customer details updated successfully");
      // Reset form
      setUpdateCustomerId("");
      setUpdateCustomerUsername("");
      setUpdateCustomerEmail("");
      setUpdateCustomerContactNumber("");
    } catch (error) {
      console.error("Error updating customer details:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:1337/customers`, {
        customer_id: deleteCustomerId,
      });
      console.log("Customer deleted successfully");
      // Reset form
      setDeleteCustomerId("");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="form">
      <h1>CUSTOMER DETAILS</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={customerUsername}
            onChange={(e) => setCustomerUsername(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Contact Number:
          <input
            type="text"
            value={customerContactNumber}
            onChange={(e) => setCustomerContactNumber(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Submit Customer Details</button>
      </form>

      <h1>UPDATE CUSTOMER</h1>
      <form onSubmit={handleUpdate}>
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
          Updated Username:
          <input
            type="text"
            value={updateCustomerUsername}
            onChange={(e) => setUpdateCustomerUsername(e.target.value)}
            // required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Updated Email:
          <input
            type="email"
            value={updateCustomerEmail}
            onChange={(e) => setUpdateCustomerEmail(e.target.value)}
            // required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Updated Contact Number:
          <input
            type="text"
            value={updateCustomerContactNumber}
            onChange={(e) => setUpdateCustomerContactNumber(e.target.value)}
            // required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Update Customer</button>
      </form>

      <h1>DELETE CUSTOMER</h1>
      <form onSubmit={handleDelete}>
        <label>
          Customer ID:
          <input
            type="text"
            value={deleteCustomerId}
            onChange={(e) => setDeleteCustomerId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Delete Customer</button>
      </form>
    </div>
  );
};
