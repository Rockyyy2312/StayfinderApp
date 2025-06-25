const admin = require("../config/firebaseAdmin");
const verifyToken = require("../middleware/verifyToken");

const firebaseAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const idToken =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split("Bearer ")[1]
      : null;

  if (!idToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = firebaseAuth;
