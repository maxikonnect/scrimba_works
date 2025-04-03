import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import StartTest from './pages/StartTest';
import Contact from './pages/Contact';

import Login from './pages/Login';
import SignUp from './pages/SignUp';


export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="start-test" element={<StartTest />} />
        <Route path="log-in" element={<Login />} />
        <Route path="Sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  )
}