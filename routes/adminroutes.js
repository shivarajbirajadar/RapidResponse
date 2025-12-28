const express = require("express");
const router = express.Router();
const admin = require("../controllers/admincontroller");
const { isLoggedIn, isAdmin } = require("../middleware/auth");  // import both

// Admin dashboard (only if logged-in & admin)
router.get("/dashboard", isLoggedIn, isAdmin, admin.dashboard);

// Update incident status (admin only)
router.post("/update/:id", isLoggedIn, isAdmin, admin.updateIncident);

module.exports = router;
