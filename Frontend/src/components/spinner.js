import React from "react";
import "./spinner.css";

const Spinner = ({ size = "80px" }) => {
  return (
    <div className="container">
      <div className="container">
        <div
          className="spinner-container"
          style={{ height: size, width: size }}
        >
          <p className="text-spinner">Eẞ</p>
        </div>
      </div>
    </div>
  );
};
export default Spinner;
