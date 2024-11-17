const express = require('express');
const {
  createComplaint,
  getComplaints,
  likeComplaint,
  deleteComplaint 
} = require('../controllers/complaintController'); 
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getComplaints);

router.post('/', protect, createComplaint);

router.put('/:id/like', protect, likeComplaint);

router.delete('/:id', protect,deleteComplaint);

module.exports = router;
