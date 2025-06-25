import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import axios from "../utils/axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ msg: "", type: "idle" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus({ msg: "Signing you in…", type: "loading" });

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await user.getIdToken();
      await axios.post("/auth/login", { idToken });
      localStorage.setItem("token", idToken);
      setStatus({ msg: "Login successful ", type: "success" });
      navigate("/listings");
    } catch (err) {
      setStatus({ msg: err.message || "Login failed ", type: "error" });
    }
  };

  const msgColor =
    status.type === "success"
      ? "text-green-600"
      : status.type === "error"
      ? "text-red-500"
      : "text-gray-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Forgot password link */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={status.type === "loading"}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              status.type === "loading"
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {status.type === "loading" ? "Logging in…" : "Login"}
          </button>
        </form>

        {/* Status message */}
        <p className={`mt-4 text-center min-h-[1.5rem] ${msgColor}`}>
          {status.msg}
        </p>

        {/* Sign-up prompt */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
