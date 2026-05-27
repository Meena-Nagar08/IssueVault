// Complaint schema for storing hostel issues submitted by students
const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  issueTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved", "Verified"],
    default: "Pending"
  },
  studentConfirmed: {
  type: Boolean,
  default: false
}
}, { timestamps: true });

module.exports = mongoose.model("Complaint", ComplaintSchema);