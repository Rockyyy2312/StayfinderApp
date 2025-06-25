// Deprecated: Not used anymore. Use firebaseAuth.js for authentication.

const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key";

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token", error: err.message });
  }
};
