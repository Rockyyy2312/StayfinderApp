import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ───────────────  App Name Banner  ─────────────── */}
      <header className="w-full bg-blue-800 py-4">
        <h1 className="text-center text-3xl font-extrabold text-white tracking-wide">
          StayFinder
        </h1>
      </header>

      {/* ───────────────  Hero Section  ─────────────── */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Section */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 leading-tight">
              Find Your <span className="text-green-500">Perfect Stay</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Discover, book, and enjoy beautiful properties around the world.
              Your next adventure starts here!
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start">
              <Link to="/login">
                <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 font-medium transition duration-300">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-6 py-3 bg-yellow-400 text-white rounded-lg shadow hover:bg-yellow-500 font-medium transition duration-300">
                  Register
                </button>
              </Link>
            </div>
          </div>

          {/* Right Section - Property Image */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-xs md:max-w-sm h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border bg-white">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Modern Property"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </main>

      {/* ───────────────  Footer  ─────────────── */}
      <footer className="w-full bg-gray-200 py-4">
        <p className="text-center text-sm text-gray-600">
          © 2025 Laukik Parashare
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
