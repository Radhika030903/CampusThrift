import React from "react";
import { AuthProvider, useAuth } from './contextStore/AuthContext'; // Use AuthProvider context
import PostProvider from './contextStore/PostContext';
import AllPostProvider from './contextStore/AllPostContext';

import Dashboard from './Components/Dashboard';
import Header from './Components/Header/Header.js';

import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import LoginView from "./View/LoginView";
import SignupView from "./View/SignupView";
import HomeView from "./View/Homeview";
import Posts from "./Components/Post/Post";
import Productdetails from "./Components/Post/Productdetails";
import CreatePost from "./Components/CreatePost/CreatePost";
import 'react-toastify/dist/ReactToastify.css';

// Custom Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// Custom wrapper to access location and conditionally render Header
const AppWrapper = () => {
  const location = useLocation();
  const hideHeaderOnRoutes = ["/login", "/signup"];

  return (
    <>
      {!hideHeaderOnRoutes.includes(location.pathname) && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignupView />} />
        <Route path="/login" element={<LoginView />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><HomeView /></ProtectedRoute>} />
        <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path="/view/:id" element={<ProtectedRoute><Productdetails /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AllPostProvider>
        <PostProvider>
          <Router>
            <AppWrapper />
          </Router>
        </PostProvider>
      </AllPostProvider>
    </AuthProvider>
  );
}

export default App;

