import React from "react";
import { Link } from "react-router-dom";
import bookingsIcon from "../../assests/bookings.jpg";
import feedbackIcon from "../../assests/feedback_og.webp";
import adminIcon from "../../assests/admin.jpg";


// Array of card data
const cardData = [
  {
    title: "Booking",
    icon: bookingsIcon,
    link: "/Admin_booking",
  },
  {
    title: "Feedback",
    icon: feedbackIcon,
    link: "/feedback",
  },
  {
    title: "Admin Details",
    icon: adminIcon,
    link: "/admin_detail",
  },
];

export const Admin = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Admin Operations
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cardData.map((card, index) => (
            <Link to={card.link} key={index}>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="p-6 flex flex-col items-center justify-center">
                  <div className="mb-4">
                    <img
                      src={card.icon}
                      alt={card.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-white">{card.title}</h2>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
