import React from "react";
import "./changeDetailsButton.css";

function changeDetailsButton({ onClick }) {
  return (
    <div className="change-details-button-container">
      <button onClick={onClick} className="change-details-button"></button>
    </div>
  );
}

export default changeDetailsButton;
