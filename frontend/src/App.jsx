import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home, Customer, Admin,CustomerDetailsForm,AdminDetailsForm, Cust_booking, Admin_booking, EventDetailsForm,PaymentForm, VenueDetailsForm, ServiceDetailsForm, FeedbackDetailsForm } from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cust_booking" element={<Cust_booking />} />
        <Route path="/admin_detail" element={<AdminDetailsForm />} />
        <Route path="/cust_detail" element={<CustomerDetailsForm />} />
        <Route path="/admin_booking" element={<Admin_booking />} />
        <Route path="/payment" element={<PaymentForm />} />

        <Route path="/event" element={<EventDetailsForm />} />
        <Route path="/service" element={<ServiceDetailsForm />} />
        <Route path="/venue" element={<VenueDetailsForm />} />
        <Route path="/feedback" element={<FeedbackDetailsForm />} />
      </Routes>
    </div>
  );
}

export default App;
