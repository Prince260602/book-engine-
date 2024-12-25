import React, { useState } from "react";
import "./signup.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signUpUser = (e) => {
    e.preventDefault();
    setLoading(true);
    if (auth) {
      if (email && password && name) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (resp) => {
            await updateProfile(auth.currentUser, { displayName: name });
            navigate("/", { replace: true });
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            alert(err.message);
            setLoading(false);
          });
      } else {
        alert("Please fill in all details");
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="login-overall-container">
      <div class="signup-container">
        <div class="signup-header">
          <h2>Create a New Account</h2>
        </div>
        <div class="signup-form">
          <form>
            <div class="form-group">
              <label for="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              <button onClick={signUpUser}>
                {loading ? <div className="spinner" /> : "Sign Up"}
              </button>
            </div>
            <div class="form-group login-link">
              <p>
                Already have an account? <a onClick={navigateToLogin}>Log In</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
