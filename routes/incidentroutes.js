const express = require("express");
const router = express.Router();
const c = require("../controllers/incidentcontroller");
const upload = require("../middleware/upload");
const {isAdmin} = require("../middleware/auth");

router.get("/incidents",c.getAll);
router.get("/incidents/new", c.renderForm); 

router.post("/incidents",upload.single("image"), c.createIncident);
router.get("/incidents/:id",c.details);
router.get("/admin/dashboard", c.adminDashboard);
router.post("/incidents/:id/verify", c.verifyIncident);
router.post("/incidents/:id/status", c.updateStatus);

router.get("/map", c.mapView);



module.exports = router;