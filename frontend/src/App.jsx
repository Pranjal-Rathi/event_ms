import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import {
  Home,
  Customer,
  Admin,
  CustomerDetailsForm,
  AdminDetailsForm,
  AdminFeedbackForm,
  Cust_booking,
  BookingAdminDetailsForm,
  BookingDetailsForm,
  EventDetailsForm,
  PaymentForm,
  VenueDetailsForm,
  ServiceDetailsForm,
  FeedbackDetailsForm,
} from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/cust_booking" element={<Cust_booking />} />
        <Route path="/cust_detail" element={<CustomerDetailsForm />} />

        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/booking" element={<BookingDetailsForm />} />
        <Route path="/event" element={<EventDetailsForm />} />
        <Route path="/service" element={<ServiceDetailsForm />} />
        <Route path="/venue" element={<VenueDetailsForm />} />
        <Route path="/feedback" element={<FeedbackDetailsForm />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin_detail" element={<AdminDetailsForm />} />
        {/* <Route path="/admin_booking" element={<Admin_booking />} /> */}
        <Route path="/booking_admin" element={<BookingAdminDetailsForm />} />
        <Route path="/feedback_admin" element={<AdminFeedbackForm />} />
      </Routes>
    </div>
  );
}

export default App;
