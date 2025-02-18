import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import FeedbackForm from './feedback';
import FeedbackList from './feedbacklist';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/feedbacks"
        element={token ? <FeedbackList /> : <Navigate to="/login" />}
      />
      <Route
        path="/submit-feedback"
        element={token ? <FeedbackForm /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
