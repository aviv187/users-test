import React from "react";
import "./changeDetailsButton.css";

function changeDetailsButton({ onClick }) {
  return (
    <div className="change-details-button-container">
      <button onClick={onClick}>Change your details</button>
    </div>
  );
}

export default changeDetailsButton;
