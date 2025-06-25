const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middleware/firebaseAuth");
const Property = require("../models/Property");

// Create property (Protected)
router.post("/", firebaseAuth, async (req, res) => {
  try {
    const { name, location, price } = req.body;

    const property = new Property({
      name,
      location,
      price,
      userId: req.user.uid,
    });

    await property.save();
    res.status(201).json({ message: "Property created", property });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single property
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
