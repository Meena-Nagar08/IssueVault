const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

const {
  addComplaint,
  getComplaints,
  updateStatus,
  confirmResolution
} = require("../controllers/complaintController");

router.post("/complaints", authMiddleware, addComplaint);
router.get("/complaints", authMiddleware, getComplaints);
router.put("/complaints/:id", authMiddleware, updateStatus);  
router.put("/complaints/:id/confirm", authMiddleware, confirmResolution);

module.exports = router;