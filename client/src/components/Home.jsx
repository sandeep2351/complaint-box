import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import "../css/Home.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const HomePage = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(!!localStorage.getItem('authToken'));
    };
    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  const sortComplaintsByLikes = (complaints) => {
    return complaints.sort((a, b) => b.likes - a.likes);
  };

  const fetchComplaints = async (filterValue = '') => {
    setLoading(true);
    setIsSpinnerVisible(true);
    const minLoadingTime = 500;

    try {
      const response = filterValue === 'all'
        ? await fetch('http://localhost:5000/api/complaints')
        : await fetch(`http://localhost:5000/api/complaints?dept=${filterValue}`);
        
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched complaints:', data);
      setComplaints(sortComplaintsByLikes(data));
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setIsSpinnerVisible(false);
      }, minLoadingTime);
    }
  };

  useEffect(() => {
    fetchComplaints(); 
  }, []);


  const handleFilterChange = (event) => {
    const deptValue = event.target.value;
    setFilter(deptValue);
    fetchComplaints(deptValue);
  };

  const handleLike = async (complaintId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error("Please login to like");
      return navigate('/login'); 
    }

    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${complaintId}/like`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const updatedComplaint = await response.json();
        setComplaints((prevComplaints) =>
          sortComplaintsByLikes(
            prevComplaints.map((complaint) =>
              complaint._id === complaintId
                ? updatedComplaint
                : complaint
            )
          )
        );
        toast.success("Liked successfully");
      } else {
        toast.error('Failed to like the complaint');
      }
    } catch (error) {
      toast.error('Error liking the complaint');
    }
  };

  const handleDelete = async (complaintId) => {
    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${complaintId}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        setComplaints((prevComplaints) =>
          prevComplaints.filter((complaint) => complaint._id !== complaintId)
        );
        toast.success('Complaint deleted successfully');
      } else {
        toast.error('Failed to delete the complaint');
      }
    } catch (error) {
      toast.error('Error deleting the complaint');
    }
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} /> 
      <ToastContainer /> 
    
      <form method='POST' className='filter'>
        <h3 style={{ color: '#444' }}>Select a Filter</h3>
        <select name='deptValue' value={filter} onChange={handleFilterChange}>
          <option value='' hidden>Department</option>
          <option value='cse'>CSE</option>
          <option value='it'>IT</option>
          <option value='csbs'>CS&BS</option>
          <option value='aids'>AI&DS</option>
          <option value='aiml'>AI&ML</option>
          <option value="ece">ECE</option>
          <option value='all'>&#10006; Clear</option>
        </select>
      </form>

      <main>
        {isSpinnerVisible && (
          <div className={`loading-spinner ${!loading ? 'hidden' : ''}`}>
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        {!loading && (
          <>
            <h1>Registered Complaints</h1>
            <div className="complaints-list">
              {complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <div className="complaint" key={complaint._id}>
                    <div className="user-info">
                      <h2>{complaint.name}</h2>
                    </div>
                    <p>{complaint.typeOfComplaint}</p>
                    <p>{complaint.complaintText}</p>
                    <div className="actions-container">
                      <Link className="read-more-btn" to={`/post/${complaint._id}`}>Read More..</Link>
                      <div className="like-section">
                        <button
                          className="like-btn"
                          onClick={() => handleLike(complaint._id)}
                        >
                          <FontAwesomeIcon icon={faHeart} style={{ fontSize: '25px'}} />
                        </button>
                        <span className="like-count">{complaint.likes}</span>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(complaint._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ fontSize: '25px'}} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No complaints found.</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
