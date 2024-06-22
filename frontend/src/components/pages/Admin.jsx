import React from "react";
import { Link } from "react-router-dom";
import bookingsIcon from "../../assests/bookings.jpg";
import feedbackIcon from "../../assests/feedback_og.webp";
import adminIcon from "../../assests/admin.jpg";

// Array of card data
const cardData = [
  {
    title: "Booking Details",
    icon: bookingsIcon,
    link: "/booking_admin",
  },
  {
    title: "Feedback",
    icon: feedbackIcon,
    link: "/feedback_admin",
  },
  {
    title: "Admin Details",
    icon: adminIcon,
    link: "/admin_detail",
  },
];


export const Admin = () => {
  return (
    <div className="bg-[#F1F7ED] min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#243E36] mb-8 text-center">
          Admin Operation
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cardData.map((card, index) => (
            <Link to={card.link} key={index}>
              <div className="bg-[#E0EEC6] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="p-6 flex flex-col items-center justify-center">
                  <div className="mb-4">
                    <img
                      src={card.icon}
                      alt={card.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-[#243E36]">
                    {card.title}
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-[#7CA982] to-[#C2A83E] h-2"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

