import React, { useState } from "react";
import "./login.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = () => {
    if (auth) {
      if (email && password) {
        signInWithEmailAndPassword(auth, email, password)
          .then((resp) => {
            console.log(resp);
            navigate("/");
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        alert("Please fill in all details");
      }
    }
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-overall-container">
      <div class="login-container">
        <div class="login-header">
          <h2>Login to Your Account</h2>
        </div>
        <div class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="form-group">
            <button onClick={loginUser}>Login</button>
          </div>
          <div class="form-group forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
        </div>
        <div class="create-account">
          <p>
            Don't have an account? <a onClick={navigateToSignup}>Create One</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
