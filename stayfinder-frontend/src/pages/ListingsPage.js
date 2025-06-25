import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

function ListingsPage() {
  const [listings, setListings] = useState([]);

  /* ─────────────────────  filter state  ───────────────────── */
  const [locationFilter, setLocationFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  /* ─────────────────────  images  ───────────────────── */
  const fallbackImages = [
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  ];

  useEffect(() => {
    axios.get("/properties").then((res) => setListings(res.data));
  }, []);

  /* ─────────────────────  helper  ───────────────────── */
  const getDisplayName = (l) => {
    if (l.name && !/test/i.test(l.name)) return l.name;
    if (/test/i.test(l.name || "")) return "Skyline Villa";
    if (l.location === "Pune" && l.price === 17000) return "Urban Nest";
    return "Unnamed Property";
  };

  /* ─────────────────────  filtering logic  ───────────────────── */
  const filtered = listings.filter((l) => {
    /* location */
    const locOK =
      !locationFilter ||
      l.location?.toLowerCase().includes(locationFilter.toLowerCase());

    /* price */
    const priceOK =
      (!minPrice || l.price >= Number(minPrice)) &&
      (!maxPrice || l.price <= Number(maxPrice));

    /* date availability  */
    const datesSelected = dateFrom && dateTo;
    const listingHasRange = l.availableFrom && l.availableTo;

    let dateOK = true;
    if (datesSelected && listingHasRange) {
      const fromOK = new Date(dateFrom) >= new Date(l.availableFrom);
      const toOK = new Date(dateTo) <= new Date(l.availableTo);
      dateOK = fromOK && toOK;
    }

    return locOK && priceOK && dateOK;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-emerald-100 py-10 px-4">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-700 drop-shadow">
        Available Listings
      </h2>

      {/* ───────────────  filter UI  ─────────────── */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-4 mb-10 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-28 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-28 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* ───────────────  listings grid  ─────────────── */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-600">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {filtered.map((listing, idx) => (
            <div
              key={listing._id}
              className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-start hover:scale-105 hover:shadow-indigo-200 transition-transform relative group"
            >
              {idx === 0 && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce z-10">
                  Featured
                </span>
              )}

              <img
                src={
                  listing.image ||
                  listing.imageUrl ||
                  fallbackImages[idx % fallbackImages.length]
                }
                alt={getDisplayName(listing)}
                className="w-full h-44 object-cover rounded-xl mb-4 group-hover:opacity-90 transition"
              />

              <h3 className="text-2xl font-bold mb-1 text-gray-800">
                {getDisplayName(listing)}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {listing.description?.slice(0, 120) ||
                  "Discover your next great stay."}
              </p>

              {/* location & price */}
              <p className="text-gray-600 mb-1 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
                {listing.location}
              </p>
              <p className="text-gray-600 mb-4 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm1 17h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 12.9 12 13.5 12 15h-2v-.5c0-1 .45-1.9 1.17-2.63l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 10-4 0H8a4 4 0 118 0c0 .88-.36 1.68-.93 2.25z" />
                </svg>
                <span className="font-semibold">₹{listing.price}</span>
              </p>

              <Link to={`/listing/${listing._id}`} className="w-full">
                <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow hover:from-blue-600 hover:to-indigo-600 font-semibold text-lg transition">
                  View
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListingsPage;
