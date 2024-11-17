import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../css/post.css"

const ComplaintPost = () => {
  const [complaint, setComplaint] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await fetch(`/api/complaints/${id}`);
        const data = await response.json();
        setComplaint(data);
      } catch (error) {
        console.error('Error fetching complaint:', error);
      }
    };

    fetchComplaint();
  }, [id]);

  if (!complaint) {
    return <div>Loading complaint...</div>;
  }

  return (
    <div>
      <nav>
        <div className="navbar">
          <div className="navbar-brand">VIT Complaints</div>
          <Link className="submit-btn" to="/submit-form">Submit a complaint</Link>
        </div>
      </nav>

      <div className="post-container">
        <div className="post">
          <h3>Name: {complaint.name}</h3>
          <p>Roll Number: {complaint.registerNo}</p>
          <p>Type: {complaint.typeOfComplaint}</p>
          <p>Department: {complaint.department}</p>
          <p>Complaint: {complaint.complaintText}</p>
          <span className="post-counter">Likes: {complaint.likes}</span>
          <br /><br />
          <Link className="submit-button" to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ComplaintPost;
