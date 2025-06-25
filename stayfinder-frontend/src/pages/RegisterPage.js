import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase"; // Use your initialized auth
import axios from "../utils/axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      await axios.post("/auth/register", { idToken });
      localStorage.setItem("token", idToken);
      setMessage("Registration successful ");
      navigate("/listings");
    } catch (error) {
      setMessage("Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
              Register
            </h2>
            <form onSubmit={handleRegister} className="space-y-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="submit"
                className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Register
              </button>
              <p className="text-center text-red-500 mt-2 min-h-[1.5rem]">
                {message}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
