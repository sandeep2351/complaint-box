import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  }, [navigate, setIsAuthenticated]);

  return <p>Logging out...</p>;
};

export default Logout;
