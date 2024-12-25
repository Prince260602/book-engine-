import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MyComponent from "./pages/genre_name";
import Chapnos from "./pages/chap_no";
import reportWebVitals from "./reportWebVitals";
import Content from "./pages/content";
import Output from "./pages/output";
import Login from "./pages/login";
import Signup from "./pages/signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/" element={<App />} />
      <Route exact path="/names" element={<MyComponent />} />
      <Route exact path="/chap" element={<Chapnos />} />
      <Route exact path="/content" element={<Content />} />
      <Route exact path="/output" element={<Output />} />
      {/* // <Route path="*" element={<NoPage />} />  */}
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
