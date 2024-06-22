import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Modal from "react-modal";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 40,
  },
  section: {
    marginBottom: 10,
  },
  titleContainer: {
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // Tailwind-like utility classes
    // You can define these styles based on Tailwind classes
    color: "#800000",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    // Tailwind-like utility classes
    // You can define these styles based on Tailwind classes
    color: "#6B7280",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    // Tailwind-like utility classes
    // You can define these styles based on Tailwind classes
    color: "#4B5563",
  },
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const PDFReport = ({ bookingDetails }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Event Summary</Text>
          </View>
        </View>
        {bookingDetails && bookingDetails.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Bookings:</Text>
            {bookingDetails.map((booking21) => (
              <View key={booking21.Venue_name} style={styles.text}>
                <Text>{booking21.Venue_name}</Text>
                {/* <Text>Parent Name: {booking21.parent_name}</Text>
                <Text>Date of Birth: {formatDate(booking21.DOB)}</Text>
                <Text>Phone: {booking21.phone}</Text>
                <Text>Class: {booking21.class}</Text> */}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text>No bookingDetails found.</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export const BookingAdminDetailsForm = () => {
  const [bookingId, setBookingId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [eventId, setEventId] = useState("");
  const [venueId, setVenueId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [bookingDetails, setBookingDetails] = useState([]);
  // const [bookingDetails2, setBookingDetails2] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    // Fetch booking21 data from API
    handleBooking2();
  }, []);

  const handleBooking2 = async () => {
    try {
      const response = await axios.get("http://localhost:1337/bookings_admin", {
        params: {
          booking_id: bookingId,
          customer_id: customerId,
          event_id: eventId,
          venue_id: venueId,
          service_id: serviceId,
        },
      });
      console.log("Booking details displayed successfully");
      setBookingDetails(response.data); // Set the response data in state
      console.log(response.data);
      // Reset form
      // setBookingId("");
      // setCustomerId("");
      // setEventId("");
      // setVenueId("");
      // setServiceId("");
    } catch (error) {
      console.error("Error displaying Booking details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleBooking2();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      console.log(bookingId);
      const response = await axios.delete(
        `http://localhost:1337/bookings_admin`,
        {
          data: {
            booking_id: bookingId,
            customer_id: customerId,
            event_id: eventId,
            venue_id: venueId,
            service_id: serviceId,
          },
        }
      );
      console.log(" Event Booking deleted successfully");
      // Reset form
      // setDeleteAdminId("");
    } catch (error) {
      console.error("Error deleting event booking:", error);
    }
  };

  function confirmDelete(event) {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      event.preventDefault(); // Prevents the form from submitting
    }
  }

  const generatePDF = () => {
    const input = document.getElementById("reportContent");

    if (input) {
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          pdf.addImage(imgData, "PNG", 0, 0);
          pdf.save("report.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
          // window.alert('Failed to generate PDF. Please try again.');
        });
    } else {
      console.error('Element with ID "reportContent" not found in the DOM.');
      window.alert("Failed to generate PDF. Please try again.");
    }
  };

  // Open
  const Analysis = async () => {
    // Fetch the latest booking21 data before generating the PDF
    await handleBooking2();

    // Open the modal when Analyse button is clicked
    setShowModal(true);
    generatePDF();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="form">
      <h1>BOOKING DETAILS</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Booking ID:
          <input
            type="text"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Customer ID:
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Event ID:
          <input
            type="text"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Venue ID:
          <input
            type="text"
            value={venueId}
            onChange={(e) => setVenueId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <label>
          Service ID:
          <input
            type="text"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Show Booking Details</button>
      </form>

      {Array.isArray(bookingDetails) && bookingDetails.length > 0 ? (
        <ul>
          {bookingDetails.map((booking, index) => (
            <li key={index}>{booking.Venue_name}</li>
          ))}
        </ul>
      ) : (
        <p>No booking details to display</p>
      )}

      <form onSubmit={handleDelete}>
        <button type="submit" onClick={confirmDelete}>
          Delete Booking
        </button>
      </form>

      {/* {mode === "view" && ( */}
      <div>
        <button
          onClick={Analysis}
          className="flex items-center px-6 py-2 mb-4 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
        >
          Print Event Report
        </button>

        {/* Modal */}
        <div id="reportContent">
          <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            contentLabel="PDF Report"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {bookingDetails && ( // Add null check here
                <PDFViewer style={{ width: "100%", height: "75vh" }}>
                  <PDFReport bookingDetails={bookingDetails} />
                </PDFViewer>
              )}
              <div style={{ marginTop: "1rem" }}>
                <PDFDownloadLink
                  document={<PDFReport bookingDetails={bookingDetails} />}
                  fileName="report.pdf"
                >
                  {({ blob, url, loading, error }) => (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      {loading ? "Loading..." : "Download PDF"}
                    </button>
                  )}
                </PDFDownloadLink>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};
