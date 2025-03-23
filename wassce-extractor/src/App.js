import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Cleanup function to avoid memory leaks
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              {/* Redirect to home if logged in, otherwise show login */}
              <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />

              {/* Login Page */}
              <Route path="/login" element={<Login />} />

              {/* Home Page - Protected Route */}
              <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />

              {/* Catch-all route to prevent unmatched route errors */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {/* Notifications */}
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
