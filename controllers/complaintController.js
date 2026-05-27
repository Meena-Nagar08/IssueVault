const Complaint = require("../models/complaint");

exports.addComplaint = async (req, res) => {
  try {
    const { studentName, issueTitle, description } = req.body;
    const complaint = new Complaint({ studentName, issueTitle, description });
    await complaint.save();
    res.status(201).json({ message: "Complaint submitted", complaint });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get all complaints
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Update complaint status
exports.updateStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    // If already verified by student — lock it!
    if (complaint.status === 'Verified') {
      return res.status(400).json({ message: "This complaint has been verified by the student and cannot be changed." });
    }

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({ message: "Status updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.confirmResolution = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { studentConfirmed: true, status: "Verified" },
      { new: true }
    );
    res.status(200).json({ message: "Verified!", complaint });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};