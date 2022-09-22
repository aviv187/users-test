import React from "react";
import Popup from "./popup";
import "./user-popup.css";

function UserPopup({ user, onClose }) {
  return (
    <Popup onClose={onClose}>
      <div className="user-popup-name">{user.displayName || "New user"}</div>
      <div className="user-popup-data">
        <span className="user-popup-label">Email: </span>{" "}
        {user.email || "Unknown"}
      </div>
      <div className="user-popup-data">
        <span className="user-popup-label">User Agent: </span>
        {user.userAgent}
      </div>
      <div className="user-popup-data">
        <span className="user-popup-label">Last Visit: </span>
        {new Date(user.lastVisited).toLocaleDateString("en", {
          second: "2-digit",
          minute: "2-digit",
          hour: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </div>
      <div className="user-popup-data">
        <span className="user-popup-label">Visits Count: </span> {user.visits}
      </div>
    </Popup>
  );
}

export default UserPopup;
