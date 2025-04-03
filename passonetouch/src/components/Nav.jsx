import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ scrollToAbout, scrollToServices, scrollToTestimonial }) => {
    return (
      <nav className="navbar">
        <ul className="nav-menu">
          <li className="nav-list-item">
            <button onClick={scrollToAbout} className="nav-button">About</button>
          </li>
          <li className="nav-list-item">
            <button onClick={scrollToServices} className="nav-button">Services</button>
          </li>
          <li className="nav-list-item">
            <button onClick={scrollToTestimonial} className="nav-button">Testimonial</button>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;