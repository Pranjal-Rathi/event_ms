import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import Modal from "react-modal";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer,
//   PDFDownloadLink,
// } from "@react-pdf/renderer";

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

const PDFReport = ({ administrators }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Student Report</Text>
          </View>
        </View>
        {administrators && administrators.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.subtitle}>administrators:</Text>
            {administrators.map((student) => (
              <View key={student.student_id} style={styles.text}>
                <Text>Name: {student.name}</Text>
                <Text>Parent Name: {student.parent_name}</Text>
                <Text>Date of Birth: {formatDate(student.DOB)}</Text>
                <Text>Phone: {student.phone}</Text>
                <Text>Class: {student.class}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text>No administrators found.</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export const BookingDetailsForm = () => {
  const [customerId, setCustomerId] = useState("");
  const [venueName, setVenueName] = useState("");
  const [eventId, setEventId] = useState("");
  const [updateBookingId, setUpdateBookingId] = useState("");
  const [updateCustomerId, setUpdateCustomerId] = useState("");
  const [updateVenueName, setUpdateVenueName] = useState("");
  const [updateEventId, setUpdateEventId] = useState("");
  const [deleteBookingId, setDeleteBookingId] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const [administrators, setAdministrators] = useState([]);

  useEffect(() => {
    const fetchAdministrators = async () => {
      try {
        const response = await axios.get("http://localhost:1337/tests");
        setAdministrators(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching administrators:", error);
      }
    };

    // fetchAdministrators();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/bookings", {
        customer_id: customerId,
        venue_name: venueName,
        event_id: eventId,
      });
      console.log("Booking details submitted successfully");
      // Reset form
      setCustomerId("");
      setVenueName("");
      setEventId("");
    } catch (error) {
      console.error("Error submitting Booking details:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:1337/bookings`, {
        booking_id: updateBookingId,
        customer_id: updateCustomerId,
        venue_name: updateVenueName,
        event_id: updateEventId,
      });
      console.log("Booking details updated successfully");
      // Reset form
      setUpdateBookingId("");
      setUpdateCustomerId("");
      setUpdateVenueName("");
      setUpdateEventId("");
    } catch (error) {
      console.error("Error updating Booking details:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:1337/bookings`, {
        data: {
          booking_id: deleteBookingId,
        },
      });
      console.log("Booking deleted successfully");
      // Reset form
      setDeleteBookingId("");
    } catch (error) {
      console.error("Error deleting Booking:", error);
    }
  };

  const openPowerBIReport = () => {
    window.open("YOUR_POWER_BI_EMBED_LINK", "_blank");
  };

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
    // Fetch the latest student data before generating the PDF
    await fetchAdministrators();

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
          Event ID:
          <input
            type="text"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Submit Booking Details</button>
      </form>

      <h1>UPDATE BOOKING</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Booking Id:
          <input
            type="text"
            value={updateBookingId}
            onChange={(e) => setUpdateBookingId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
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
          Venue Name:
          <input
            type="text"
            value={updateVenueName}
            onChange={(e) => setUpdateVenueName(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
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
        <button type="submit">Update Booking</button>
      </form>

      <h1>DELETE BOOKING</h1>
      <form onSubmit={handleDelete}>
        <label>
          Booking Id:
          <input
            type="text"
            value={deleteBookingId}
            onChange={(e) => setDeleteBookingId(e.target.value)}
            required
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Delete Booking</button>
      </form>

      <h1>VIEW REPORT</h1>
      <button
        onClick={openPowerBIReport}
        style={{ backgroundColor: "orange", color: "white" }}
      >
        View Power BI Report
      </button>
      <button
        onClick={Analysis}
        className="flex items-center px-6 py-2 mb-4 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
      >
        Analyse
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
            {administrators && ( // Add null check here
              <PDFViewer style={{ width: "100%", height: "75vh" }}>
                <PDFReport administrators={administrators} />
              </PDFViewer>
            )}
            <div style={{ marginTop: "1rem" }}>
              <PDFDownloadLink
                document={<PDFReport administrators={administrators} />}
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
  );
};
