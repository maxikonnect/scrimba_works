import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import loginpic from '../Assets/images/loginpic.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "../pages/Home";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <main className="login-form-container">
      <form onSubmit={handleSubmit} className="loginForm">
        
        <div className="loginsubContain">
          <img src={loginpic} alt="logo representing login" />
        </div>
        <h3>Login</h3>
        <div className="loginsubContainer">
          <label>Email address</label> 
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="loginsubContainer">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="loginsubContainer">
          <button type="submit" className="primary-button">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
