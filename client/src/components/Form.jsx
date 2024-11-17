import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Form.css"

const ComplaintForm = () => {
  const [name, setName] = useState('');
  const [registerNo, setRegisterNo] = useState('');
  const [typeOfComplaint, setTypeOfComplaint] = useState('');
  const [department, setDepartment] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError('');
    const token = localStorage.getItem('authToken');
  
    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          name,
          registerNo,
          typeOfComplaint,
          department,
          complaintText,
        }),
      });
  
      if (response.ok) {
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to submit complaint. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting complaint:', err);
      setError('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="complaint-form-container">
      <form onSubmit={handleSubmit} className="complaint-form">
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#333' }}>Submit a Complaint</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="registerNo">Roll Number</label>
        <input
          type="text"
          name="registerNo"
          value={registerNo}
          onChange={(e) => setRegisterNo(e.target.value)}
          required
        />
        <label htmlFor="typeOfComplaint">Type of Complaint</label>
        <input
          type="text"
          name="typeOfComplaint"
          value={typeOfComplaint}
          onChange={(e) => setTypeOfComplaint(e.target.value)}
          required
        />
        <label htmlFor="department">Department</label>
        <input
          type="text"
          name="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <label htmlFor="complaintText">Complaint</label>
        <textarea
          name="complaintText"
          value={complaintText}
          onChange={(e) => setComplaintText(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default ComplaintForm;
