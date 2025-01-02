import React, { useState } from "react";
import "./login.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    if (!auth) return;
    if (email && password) {
      try {
        await setPersistence(auth, browserLocalPersistence)
        await signInWithEmailAndPassword(auth, email, password)
      }
      catch(err) {
        alert(err.message);
      }
    } else {
      alert("Please fill in all details");
    }
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-overall-container">
      <div className="login-container">
        <div className="login-header">
          <h2>Login to Your Account</h2>
        </div>
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button onClick={loginUser}>Login</button>
          </div>
          <div className="form-group forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
        </div>
        <div className="create-account">
          <p>
            Don't have an account? <a onClick={navigateToSignup}>Create One</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
