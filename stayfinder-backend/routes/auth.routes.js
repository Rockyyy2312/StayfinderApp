const express = require("express");
const User = require("../models/User");
const admin = require("../config/firebaseAdmin");
const firebaseAuth = require("../middleware/firebaseAuth");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, uid } = decodedToken;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already in use" });

    user = new User({ email, firebaseUid: uid });
    await user.save();

    res.status(201).json({ message: "User registered", email });
  } catch (err) {
    res.status(401).json({ error: "Invalid token or registration error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, uid } = decodedToken;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    res.json({ message: "Login successful", email });
  } catch (err) {
    res.status(401).json({ error: "Invalid token or login error" });
  }
});

// Example protected route
router.get("/protected", firebaseAuth, (req, res) => {
  res.json({ message: "You are authenticated!", user: req.user });
});

module.exports = router;
