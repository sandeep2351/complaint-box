const Complaint = require('../models/Complaint');
const mongoose=require('mongoose')


exports.createComplaint = async (req, res) => {
  const { name, registerNo, typeOfComplaint, department, complaintText } = req.body;

  try {

    const complaint = await Complaint.create({
      name,
      registerNo,
      typeOfComplaint,
      department,
      complaintText,
      likes: 0 
    });

    return res.status(201).json(complaint); 
  } catch (error) {
    console.error('Error creating complaint:', error);
    return res.status(400).json({ error: 'Failed to submit complaint.' });
  }
};

exports.getComplaints = async (req, res) => {
  const { dept } = req.query; 

  try {
    const complaints = dept 
      ? await Complaint.find({ department: dept })
      : await Complaint.find();

    return res.status(200).json(complaints); 
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return res.status(400).json({ error: 'Failed to fetch complaints.' });
  }
};


exports.likeComplaint = async (req, res) => {
  const  id  = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid complaint ID.' });
    }

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found.' });
    }

    complaint.likes = (complaint.likes || 0) + 1;
    await complaint.save();

    return res.status(200).json(complaint);
  } catch (error) {
    console.error('Error liking complaint:', error);
    return res.status(400).json({ error: 'Failed to like complaint.' });
  }
};


exports.deleteComplaint = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid complaint ID.' });
    }

    const complaint = await Complaint.findByIdAndDelete(id);

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found.' });
    }

    return res.status(200).json({ message: 'Complaint deleted successfully.' });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    return res.status(500).json({ error: 'Failed to delete complaint.' });
  }
};
