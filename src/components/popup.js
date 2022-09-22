import React from "react";
import "./popup.css";

function Popup({ children, onClose }) {
  return (
    <div className="popup">
      <div className="popup-background" onClick={onClose} />
      <div className="content">{children}</div>
    </div>
  );
}

export default Popup;
