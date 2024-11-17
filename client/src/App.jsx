import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ComplaintForm from './components/Form';
import ComplaintPost from './components/Post';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';
import Logout from './components/Logout';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('authToken'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('authToken'));
    };


    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/submit-form"
          element={
            <ProtectedRoute
              element={<ComplaintForm />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute
              element={<ComplaintPost />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/logout"
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
