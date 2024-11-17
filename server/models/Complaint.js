const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registerNo: { type: String, required: true },
  typeOfComplaint: { type: String, required: true },
  department: { type: String, required: true },
  complaintText: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;
