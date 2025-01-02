import React from "react";
import "./spinner.css";

const Spinner = ({ size = "80px" }) => {
  return (
    <div className="wrapper">
      <div
        className="spinner-container"
        style={{ height: size, width: size }}
      >
        <p className="text-spinner">Eẞ</p>
      </div>
    </div>
  );
};
export default Spinner;
