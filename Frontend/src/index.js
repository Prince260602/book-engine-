import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Home from "./Home";
import MyComponent from "./pages/genre_name";
import Chapnos from "./pages/chap_no";
import reportWebVitals from "./reportWebVitals";
import Content from "./pages/content";
import Output from "./pages/output";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Spinner from "./components/spinner";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));


const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    })
  }, []);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/names" element={<MyComponent />} />
          <Route exact path="/chap" element={<Chapnos />} />
          <Route exact path="/content" element={<Content />} />
          <Route exact path="/output" element={<Output />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
