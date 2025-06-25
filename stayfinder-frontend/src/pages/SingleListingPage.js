import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";

function SingleListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/properties/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      }
    };
    fetchListing();
  }, [id]);

  const bookNow = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/bookings",
        {
          propertyId: id,
          dateFrom: fromDate,
          dateTo: toDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message || "Booking Successful ✅");
    } catch (error) {
      setMessage("Booking Failed ❌: " + error.message);
    }
  };

  if (!listing)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">
          Loading listing details or listing not found...
        </p>
      </div>
    );

  // Default description if not provided
  const description =
    listing.description ||
    "Escape the chaos of daily life with this beautiful and peaceful stay. Featuring modern interiors, spacious living areas, and serene surroundings, this property is perfect for weekend getaways, family vacations, or remote work. Book now and experience comfort like never before.";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">
          {listing.name}
        </h2>
        <p className="text-gray-700 mb-2">
          <strong>Location:</strong> {listing.location}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Price:</strong> ₹{listing.price}
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

        <h3 className="text-xl font-semibold mb-2 text-green-700">
          Book This Listing
        </h3>
        <div className="flex flex-col md:flex-row gap-2 mb-3">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <button
          onClick={bookNow}
          className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Book Now
        </button>
        <p className="text-center text-red-500 mt-2 min-h-[1.5rem]">
          {message}
        </p>
      </div>
    </div>
  );
}

export default SingleListingPage;
