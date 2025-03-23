import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Assets/images/favicon-32x32.png";
import React from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <header className="header">
      <nav className="navList">
        <img src={logo} className="logo" alt="Wassce Analyser logo" />
        <ul className="navList-item">
          <NavLink className="logoName" to="/">WASSCE ANALYSER</NavLink>
        </ul>
      </nav>
      <button className="butt" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}
