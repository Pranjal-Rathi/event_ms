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
    const rows = await conn.query(`SELECT * from event_incrrr.administrator`);
    console.log(rows);
    const jsonS = JSON.stringify(rows);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(jsonS);
  } catch (e) {
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

app.get("/tests", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`SELECT * from event_incrrr.administrator`);
    // console.log(rows);
    const jsonS = JSON.stringify(rows);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(jsonS);
  } catch (e) {
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Events Request
app.post("/events", async (req, res) => {
  const { venue_id, event_type, event_name } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // Insert event_type into event_type table
    const resultEventType = await conn.query(
      "INSERT INTO event_incrrr.event (event_type, venue_id) VALUES (?, ?)",
      [event_type, venue_id]
    );
    // Get the generated event_type_id
    const event_type_id = resultEventType.insertId;
    // Insert event with the generated event_type_id into event table
    const resultEvent = await conn.query(
      "INSERT INTO event_incrrr.event_type (event_name) VALUES (?)",
      [event_name]
    );
    conn.release();
    res.status(201).send("Event added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Update Event Route
app.put("/events", async (req, res) => {
  const { event_type, prev_event_name, new_event_name, event_id } = req.body;
  //   const { event_id } = req.params;
  let conn;
  try {
    conn = await pool.getConnection();
    // const values = [event_type, event_id.slice(1)] ;
    // Update event_type in event_type table
    const resultEventType = await conn.query(
      "UPDATE event_incrrr.event SET event_type = ? WHERE event_id = ?",
      [event_type, event_id]
    );
    // Update event_name in event_type table
    const resultEvent = await conn.query(
      "UPDATE event_incrrr.event_type SET event_name = ? WHERE event_name = ?",
      [new_event_name, prev_event_name]
    );
    conn.release();
    res.status(200).send("Event updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Delete Event Route by event_id and event_name
app.delete("/events", async (req, res) => {
  const { event_id, event_name } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // Delete event from event table
    const resultEvent = await conn.query(
      "DELETE FROM event_incrrr.event WHERE event_id = ?",
      [event_id]
    );
    // Delete event_type from event_type table
    const resultEventType = await conn.query(
      "DELETE FROM event_incrrr.event_type WHERE event_name = ?",
      [event_name]
    );
    conn.release();
    res.status(200).send("Event and Event type deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Feedback Request
app.post("/feedbacks", async (req, res) => {
  const { comment, rating, booking_id } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const values = [comment, rating, booking_id];
    // Insert event_type into event_type table
    const resultFeedbackInsert = await conn.query(
      "INSERT INTO event_incrrr.feedback (Comments, Rating, Booking_id) VALUES (?,?,?)",
      values
    );
    conn.release();
    res.status(201).send("Feedback added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Update Feedback Route
app.put("/feedbacks", async (req, res) => {
  const { comment, rating, feedback_id, booking_id } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // const values = [comment, rating, feedback_id] ;
    // Update event_type in event_type table
    const resultFeedbackUpdate = await conn.query(
      "UPDATE event_incrrr.Feedback SET Comments = ?, Rating = ?, Booking_id = ? WHERE Feedback_id = ?",
      [comment, rating, booking_id, feedback_id]
    );
    conn.release();
    res.status(200).send("Feedback updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Delete Feedback Route by comment and rating
app.delete("/feedbacks", async (req, res) => {
  const { feedback_id } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const resultFeedbackDelete = await conn.query(
      "DELETE FROM event_incrrr.feedback WHERE Feedback_id = ?",
      [feedback_id]
    );
    if (resultFeedbackDelete.affectedRows === 0) {
      return res.status(404).send("Feedback not found");
    }
    conn.release();
    res.status(200).send("Rating and Comment deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Booking Admin
app.get("/bookings_admin", async (req, res)=>{
  const {
    booking_id,
    customer_id,
    event_id,
    venue_id,
    service_id,
  } = req.query;
  let conn;
  try {
    conn = await pool.getConnection();

    // Display all the bookings customer has made
    const resultFeedbackAdmin = await conn.query(
      "SELECT Venue_name FROM event_incrrr.booking WHERE Booking_id = ? " +
        "UNION ALL " +
        "SELECT customer_username FROM event_incrrr.customer WHERE customer_id = ? " +
        "UNION ALL " +
        "SELECT event_type FROM event_incrrr.event WHERE event_id = ? " +
        "UNION ALL " +
        "SELECT location FROM event_incrrr.venue WHERE venue_id = ? " +
        "UNION ALL " +
        "SELECT time FROM event_incrrr.venue WHERE venue_id = ? " +
        "UNION ALL " +
        "SELECT capacity FROM event_incrrr.venue WHERE venue_id = ? " +
        "UNION ALL " +
        "SELECT date FROM event_incrrr.venue WHERE venue_id = ? " +
        "UNION ALL " +
        "SELECT Name FROM event_incrrr.service WHERE Service_id = ?",
      [
        booking_id,
        customer_id,
        event_id,
        venue_id,
        venue_id,
        venue_id,
        venue_id,
        service_id,
      ]
    );
    console.log(resultFeedbackAdmin);
    console.log("Parameters:", [
      booking_id,
      customer_id,
      event_id,
      venue_id,
      service_id,
    ]); // Log the parameters

    if (resultFeedbackAdmin.affectedRows === 0) {
      return res.status(404).send("Booking not found");
    }
    conn.release();
    res.status(200).send(resultFeedbackAdmin);
    // res.status(200).send(" Complete Event Booking displayed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Delete Booking Admin
app.delete("/bookings_admin", async (req, res)=>{
  const {
    booking_id,
    customer_id,
    event_id,
    venue_id,
    service_id,
  } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // Delete admin from admin table
    await conn.query("DELETE FROM event_incrrr.booking WHERE Booking_id = ?", [
      booking_id,
    ]);
    // Delete customer
    await conn.query(
      "DELETE FROM event_incrrr.customer WHERE customer_id = ?",
      [customer_id]
    );
    // Delete event
    await conn.query("DELETE FROM event_incrrr.event WHERE event_id = ?", [
      event_id,
    ]);
    // Delete venue
    await conn.query("DELETE FROM event_incrrr.venue WHERE venue_id = ?", [
      venue_id,
    ]);
    // Delete service
    await conn.query("DELETE FROM event_incrrr.service WHERE Service_id = ?", [
      service_id,
    ]);

    res.status(200).send("Complete Event Booking deleted successfully");
    // if (resultadminDelete.affectedRows === 0) {
    //   return res.status(404).send("Booking not found");
    // }
    // conn.release();
    res.status(200).send("Complete Event Booking deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Feedback Admin
app.get("/feedbacks_admin", async (req, res)=>{
  const {
    feedback_id,
  } = req.query;
  let conn;
  try {
    conn = await pool.getConnection();

    // Display feedback table
    const resultFeedbackAdmin = await conn.query(
      "SELECT * FROM event_incrrr.feedback WHERE Feedback_id = ? " ,[feedback_id]
    );
    console.log(resultFeedbackAdmin);
    console.log("Parameters:", [
      feedback_id,
    ]);

    if (resultFeedbackAdmin.affectedRows === 0) {
      return res.status(404).send("Booking not found");
    }
    conn.release();
    res.status(200).send(resultFeedbackAdmin);
    // res.status(200).send(" Complete Event Booking displayed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Customer Insert
app.post("/customers", async (req, res) => {
  const { customer_username, customer_email, customer_contact_number } =
    req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const values = [customer_username, customer_email, customer_contact_number];
    // Insert customer data into customer table
    const resultCustomerInsert = await conn.query(
      "INSERT INTO event_incrrr.customer (customer_username, customer_email, customer_contact_number) VALUES (?,?,?)",
      values
    );
    conn.release();
    res.status(201).send("Customer added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
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
  let conn;
  try {
    conn = await pool.getConnection();
    // Update customer data in customer table
    const resultCustomerUpdate = await conn.query(
      "UPDATE event_incrrr.customer SET customer_username = ?, customer_email = ?, customer_contact_number = ? WHERE customer_id = ?",
      [customer_username, customer_email, customer_contact_number, customer_id]
    );
    conn.release();
    res.status(200).send("Customer updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Delete Customer Route
app.delete("/customers", async (req, res) => {
  const { customer_id } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // Delete customer from customer table
    const resultCustomerDelete = await conn.query(
      "DELETE FROM event_incrrr.customer WHERE customer_id = ?",
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
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Admin Insert
app.post("/admins", async (req, res) => {
  const { admin_username, admin_email, admin_contact_number } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const values = [admin_username, admin_email, admin_contact_number];
    // Insert admin data into admin table
    const resultadminInsert = await conn.query(
      "INSERT INTO event_incrrr.administrator (Username,email, Contact_number) VALUES (?,?,?)",
      values
    );
    conn.release();
    res.status(201).send("Admin added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Update Admin Route
app.put("/admins", async (req, res) => {
  const { admin_id, admin_username, admin_email, admin_contact_number } =
    req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // Update admin data in admin table
    const resultadminUpdate = await conn.query(
      "UPDATE event_incrrr.administrator SET Username = ?, email = ?, Contact_number = ? WHERE Admin_id = ?",
      [admin_username, admin_email, admin_contact_number, admin_id]
    );
    conn.release();
    res.status(200).send("Admin updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Delete Admin Route
app.delete("/admins", async (req, res) => {
  const { admin_id } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // Delete admin from admin table
    const resultadminDelete = await conn.query(
      "DELETE FROM event_incrrr.administrator WHERE Admin_id = ?",
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
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Booking Insert
app.post("/bookings", async (req, res) => {
  const { customer_id, venue_name, event_id } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const values = [customer_id, venue_name, event_id];
    // Insert admin data into admin table
    const resultadminInsert = await conn.query(
      "INSERT INTO event_incrrr.booking (Customer_id, Venue_name, Event_id) VALUES (?,?,?)",
      values
    );
    conn.release();
    res.status(201).send("Booking added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Update Booking Route
app.put("/bookings", async (req, res) => {
  const { booking_id, customer_id, venue_name, event_id } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // Update admin data in admin table
    const resultadminUpdate = await conn.query(
      "UPDATE event_incrrr.booking SET Customer_id = ?, Venue_name = ?, Event_id = ? WHERE Booking_id = ?",
      [ customer_id, venue_name, event_id, booking_id]
    );
    conn.release();
    res.status(200).send("Booking updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Delete Booking Route
app.delete("/bookings", async (req, res) => {
  const { booking_id } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // Delete admin from admin table
    const resultadminDelete = await conn.query(
      "DELETE FROM event_incrrr.booking WHERE Booking_id = ?",
      [booking_id]
    );
    if (resultadminDelete.affectedRows === 0) {
      return res.status(404).send("Booking not found");
    }
    conn.release();
    res.status(200).send("Booking deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Insert Service Route
app.post("/services", async (req, res) => {
  const { service_name } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // Insert service name into Service table
    const resultServiceInsert = await conn.query(
      "INSERT INTO event_incrrr.service (Name) VALUES (?)",
      [service_name]
    );
    conn.release();
    res.status(201).send("Service added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Update Service Route
app.put("/services", async (req, res) => {
  const { service_id, service_name } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // Update service name in Service table
    const resultServiceUpdate = await conn.query(
      "UPDATE event_incrrr.service SET Name = ? WHERE Service_id = ?",
      [service_name, service_id]
    );
    conn.release();
    res.status(200).send("Service updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Delete Service Route
app.delete("/services", async (req, res) => {
  const { service_id } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // Delete service from Service table
    const resultServiceDelete = await conn.query(
      "DELETE FROM event_incrrr.service WHERE Service_id = ?",
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
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Insert Payment Route
app.post("/payments", async (req, res) => {
  const { total_amount, taxes, booking_id, service_id, payment_type, payment_date } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();

    // Insert payment_type into payment_type table if it doesn't exist
    await conn.query(
      "INSERT IGNORE INTO event_incrrr.payment_type (pay_type) VALUES (?)",
      [payment_type]
    );

    // Insert total_amount and taxes into Cost table
    const resultCost = await conn.query(
      "INSERT INTO event_incrrr.cost (total_amount,service_id, taxes, booking_id) VALUES (?, ?, ?, ?)",
      [total_amount, service_id, taxes, booking_id ]
    );
    const cost_id = resultCost.insertId;

    // Insert payment details into payment table
    const resultPayment = await conn.query(
      "INSERT INTO event_incrrr.payment (Booking_id, Payment_date) VALUES (?, ?)",
      [booking_id, payment_date]
    );

    conn.release();
    res.status(201).send("Payment added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Insert Venue Route
app.post("/venues", async (req, res) => {
  const { v_type, venue_name, location, time, capacity, date } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();

    // Insert venue type into venue type table if it doesn't exist
    await conn.query(
      "INSERT IGNORE INTO event_incrrr.venue_type (v_type) VALUES (?)",
      [v_type]
    );

    // // Get the venue_type_id
    // const [venueTypeResult] = await conn.query(
    //   "SELECT venue_type_id FROM event_incrrr.Venue_Type WHERE v_type = ?",
    //   [v_type]
    // );
    // const venue_type_id = venueTypeResult[0].venue_type_id;

    // Insert venue details into venue table
    const resultVenue = await conn.query(
      "INSERT INTO event_incrrr.venue (venue_name, location, time, capacity, date) VALUES (?, ?, ?, ?, ?)",
      [venue_name, location, time, capacity, date]
    );

    conn.release();
    res.status(201).send("Venue added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Update Venue Route
app.put("/venues", async (req, res) => {
  const { venue_id, old_venue_type, new_venue_type , venueName ,location , time , capacity , date } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();

    // Update v_type in venue_type table
    const resultVenue = await conn.query(
      "UPDATE event_incrrr.venue_type SET v_type = ? WHERE v_type = ?",
      [new_venue_type, old_venue_type]
    );
    // Update venue data in venue table
    const resultVenueType = await conn.query(
      "UPDATE event_incrrr.venue SET venue_name = ?, location = ?, time = ?, capacity=?, date=? WHERE venue_id = ?",
      [venueName, location, time,capacity, date, venue_id]
    );
    conn.release();
    res.status(200).send("Venue updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

// Delete Venue Route by venue_id and v_type
app.delete("/venues", async (req, res) => {
  const { venue_id, v_type_new } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();

    // Delete venue from venue table
    const resultVenueDelete = await conn.query(
      "DELETE FROM event_incrrr.venue WHERE venue_id = ?",
      [venue_id]
    );

    // // Check if the v_type is not used by any other venue
    // const [venueTypeCount] = await conn.query(
    //   "SELECT COUNT(*) as count FROM event_incrrr.Venue WHERE venue_type_id = (SELECT venue_type_id FROM event_incrrr.venue_type WHERE v_type = ?)",
    //   [v_type_new]
    // );
    // const count = venueTypeCount[0].count;

    // // If v_type is not used by any other venue, delete it from venue type table
    // if (count === 0) {
    //   await conn.query("DELETE FROM event_incrrr.venue_type WHERE v_type = ?", [
    //     v_type_new,
    //   ]);
    // }

    conn.release();
    res.status(200).send("Venue deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (conn) {
      conn.release(); // release connection back to the pool
    }
  }
});

http.createServer(app).listen(1337, () => {
  console.log("server started at 1337");
});
