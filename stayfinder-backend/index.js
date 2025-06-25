const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Routes
const authRoutes = require("./routes/auth.routes");
const propertyRoutes = require("./routes/properties");
const bookingRoutes = require("./routes/bookings"); // 🟢 Moved up

// MongoDB connect
connectDB();

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes); // 🟢 Registered before app.listen

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
