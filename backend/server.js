const http = require("http");
const express = require("express"),
  bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "dbms_root",
  connectionLimit: 5,
});

app.get("/test", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`SELECT * from event_og.administrator`);
    console.log(rows);
    const jsonS = JSON.stringify(rows);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(jsonS);
  } catch (e) {}
});

// Events Request
app.post("/events", async (req, res) => {
  const { event_type, event_name } = req.body;
  try {
    const conn = await pool.getConnection();
    // Insert event_type into event_type table
    const resultEventType = await conn.query(
      "INSERT INTO event_og.Feedback_type (event_name) VALUES (?)",
      [event_name]
    );
    // Get the generated event_type_id
    const event_type_id = resultEventType.insertId;
    // Insert event with the generated event_type_id into event table
    const resultEvent = await conn.query(
      "INSERT INTO event_og.Feedback (event_type) VALUES (?)",
      [event_type]
    );
    conn.release();
    res.status(201).send("Event added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update Event Route
app.put("/events", async (req, res) => {
  const { event_type, prev_event_name, new_event_name, event_id } = req.body;
  //   const { event_id } = req.params;
  try {
    const conn = await pool.getConnection();
    // const values = [event_type, event_id.slice(1)] ;
    // Update event_type in event_type table
    const resultEventType = await conn.query(
      "UPDATE event_og.Feedback SET event_type = ? WHERE event_id = ?",
      [event_type, event_id]
    );
    // Update event_name in event_type table
    const resultEvent = await conn.query(
      "UPDATE event_og.Feedback_type SET event_name = ? WHERE event_name = ?",
      [new_event_name, prev_event_name]
    );
    conn.release();
    res.status(200).send("Event updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Event Route by event_id and event_name
app.delete("/events", async (req, res) => {
  const { event_id, event_name } = req.body;
  try {
    const conn = await pool.getConnection();
    // Delete event from event table
    const resultEvent = await conn.query(
      "DELETE FROM event_og.Feedback WHERE event_id = ?",
      [event_id]
    );
    // Delete event_type from event_type table
    const resultEventType = await conn.query(
      "DELETE FROM event_og.Feedback_type WHERE event_name = ?",
      [event_name]
    );
    conn.release();
    res.status(200).send("Event and Event type deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Feedback Request
app.post("/feedbacks", async (req, res) => {
  const { comment, rating } = req.body;
  try {
    const conn = await pool.getConnection();
    const values = [comment, rating];
    // Insert event_type into event_type table
    const resultFeedbackInsert = await conn.query(
      "INSERT INTO event_og.feedback (Comments, Rating) VALUES (?,?)",
      values
    );
    conn.release();
    res.status(201).send("Feedback added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update Feedback Route
app.put("/feedbacks", async (req, res) => {
  const { comment, rating, feedback_id } = req.body;
  try {
    const conn = await pool.getConnection();
    // const values = [comment, rating, feedback_id] ;
    // Update event_type in event_type table
    const resultFeedbackUpdate = await conn.query(
      "UPDATE event_og.Feedback SET comment = ?, rating = ? WHERE event_id = ?",
      [comment, rating, feedback_id]
    );
    conn.release();
    res.status(200).send("Feedback updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Feedback Route by comment and rating
app.delete("/feedbacks", async (req, res) => {
  const { feedback_id } = req.body;
  try {
    const conn = await pool.getConnection();
    // Delete event from event table
    const resultFeedbackDelete = await conn.query(
      "DELETE FROM event_og.feedback WHERE feedback_id = ?",
      [feedback_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).send("Feedback not found");
    }
    conn.release();
    res.status(200).send("Rating and Comment deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Customer Insert
app.post("/customers", async (req, res) => {
  const { customer_username, customer_email, customer_contact_number } =
    req.body;
  try {
    const conn = await pool.getConnection();
    const values = [customer_username, customer_email, customer_contact_number];
    // Insert customer data into customer table
    const resultCustomerInsert = await conn.query(
      "INSERT INTO event_og.customer (customer_username, customer_email, customer_contact_number) VALUES (?,?,?)",
      values
    );
    conn.release();
    res.status(201).send("Customer added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update Customer Route
app.put("/customers", async (req, res) => {
  const {
    customer_id,
    customer_username,
    customer_email,
    customer_contact_number,
  } = req.body;
  try {
    const conn = await pool.getConnection();
    // Update customer data in customer table
    const resultCustomerUpdate = await conn.query(
      "UPDATE event_og.customer SET customer_username = ?, customer_email = ?, customer_contact_number = ? WHERE customer_id = ?",
      [customer_username, customer_email, customer_contact_number, customer_id]
    );
    conn.release();
    res.status(200).send("Customer updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Customer Route
app.delete("/customers", async (req, res) => {
  const { customer_id } = req.body;
  try {
    const conn = await pool.getConnection();
    // Delete customer from customer table
    const resultCustomerDelete = await conn.query(
      "DELETE FROM event_og.customer WHERE customer_id = ?",
      [customer_id]
    );
    if (resultCustomerDelete.affectedRows === 0) {
      return res.status(404).send("Customer not found");
    }
    conn.release();
    res.status(200).send("Customer deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Admin Insert
app.post("/admins", async (req, res) => {
  const { admin_username, admin_email, admin_contact_number } = req.body;
  try {
    const conn = await pool.getConnection();
    const values = [admin_username, admin_email, admin_contact_number];
    // Insert admin data into admin table
    const resultadminInsert = await conn.query(
      "INSERT INTO event_og.administrator (Username,email, Contact_number) VALUES (?,?,?)",
      values
    );
    conn.release();
    res.status(201).send("Admin added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update Admin Route
app.put("/admins", async (req, res) => {
  const { admin_id, admin_username, admin_email, admin_contact_number } =
    req.body;
  try {
    const conn = await pool.getConnection();
    // Update admin data in admin table
    const resultadminUpdate = await conn.query(
      "UPDATE event_og.administrator SET Username = ?, email = ?, Contact_number = ? WHERE Admin_id = ?",
      [admin_username, admin_email, admin_contact_number, admin_id]
    );
    conn.release();
    res.status(200).send("Admin updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Admin Route
app.delete("/admins", async (req, res) => {
  const { admin_id } = req.body;
  try {
    const conn = await pool.getConnection();
    // Delete admin from admin table
    const resultadminDelete = await conn.query(
      "DELETE FROM event_og.administrator WHERE Admin_id = ?",
      [admin_id]
    );
    if (resultadminDelete.affectedRows === 0) {
      return res.status(404).send("Admin not found");
    }
    conn.release();
    res.status(200).send("Admin deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Insert Service Route
app.post("/services", async (req, res) => {
  const { service_name } = req.body;
  try {
    const conn = await pool.getConnection();
    // Insert service name into Service table
    const resultServiceInsert = await conn.query(
      "INSERT INTO event_og.service (Name) VALUES (?)",
      [service_name]
    );
    conn.release();
    res.status(201).send("Service added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update Service Route
app.put("/services", async (req, res) => {
  const { service_id, service_name } = req.body;
  try {
    const conn = await pool.getConnection();
    // Update service name in Service table
    const resultServiceUpdate = await conn.query(
      "UPDATE event_og.service SET Name = ? WHERE Service_id = ?",
      [service_name, service_id]
    );
    conn.release();
    res.status(200).send("Service updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Service Route
app.delete("/services", async (req, res) => {
  const { service_id } = req.body;
  try {
    const conn = await pool.getConnection();
    // Delete service from Service table
    const resultServiceDelete = await conn.query(
      "DELETE FROM event_og.service WHERE Service_id = ?",
      [service_id]
    );
    if (resultServiceDelete.affectedRows === 0) {
      return res.status(404).send("Service not found");
    }
    conn.release();
    res.status(200).send("Service deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Insert Payment Route
app.post("/payments", async (req, res) => {
  const { total_amount, taxes, payment_type, payment_date } = req.body;
  try {
    const conn = await pool.getConnection();

    // Insert payment_type into payment_type table if it doesn't exist
    await conn.query(
      "INSERT IGNORE INTO event_og.payment_type (pay_type) VALUES (?)",
      [payment_type]
    );

    // Insert total_amount and taxes into Cost table
    const resultCost = await conn.query(
      "INSERT INTO event_og.Cost (total_amount, taxes) VALUES (?, ?)",
      [total_amount, taxes]
    );
    const cost_id = resultCost.insertId;

    // Insert payment details into payment table
    const resultPayment = await conn.query(
      "INSERT INTO event_og.payment (Booking_id, Payment_date) VALUES (?, ?)",
      [1, payment_date]
    );

    conn.release();
    res.status(201).send("Payment added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Insert Venue Route
app.post("/venues", async (req, res) => {
  const { venue_name, location, time, capacity, date, v_type } = req.body;
  try {
    const conn = await pool.getConnection();

    // Insert venue type into venue type table if it doesn't exist
    await conn.query(
      "INSERT IGNORE INTO event_og.venue_type (v_type) VALUES (?)",
      [v_type]
    );

    // Get the venue_type_id
    const [venueTypeResult] = await conn.query(
      "SELECT venue_type_id FROM event_og.Venue_Type WHERE v_type = ?",
      [v_type]
    );
    const venue_type_id = venueTypeResult[0].venue_type_id;

    // Insert venue details into venue table
    const resultVenue = await conn.query(
      "INSERT INTO event_og.venue (venue_name, location, time, capacity, date, venue_type_id) VALUES (?, ?, ?, ?, ?, ?)",
      [venue_name, location, time, capacity, date, venue_type_id]
    );

    conn.release();
    res.status(201).send("Venue added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Venue Route by venue_id and v_type
app.delete("/venues", async (req, res) => {
  const { venue_id, v_type_new } = req.body;
  try {
    const conn = await pool.getConnection();

    // Delete venue from venue table
    const resultVenueDelete = await conn.query(
      "DELETE FROM event_og.Venue WHERE venue_id = ?",
      [venue_id]
    );

    // Check if the v_type is not used by any other venue
    const [venueTypeCount] = await conn.query(
      "SELECT COUNT(*) as count FROM event_og.Venue WHERE venue_type_id = (SELECT venue_type_id FROM event_og.venue_type WHERE v_type = ?)",
      [v_type_new]
    );
    const count = venueTypeCount[0].count;

    // If v_type is not used by any other venue, delete it from venue type table
    if (count === 0) {
      await conn.query("DELETE FROM event_og.venue_type WHERE v_type = ?", [
        v_type_new,
      ]);
    }

    conn.release();
    res.status(200).send("Venue deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



http.createServer(app).listen(1337, () => {
  console.log("server started at 1337");
});
