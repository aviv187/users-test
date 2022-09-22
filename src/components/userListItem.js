import React from "react";
import "./userListItem.css";

function UserListItem({ user, onClick }) {
  return (
    <div className="user-card" onClick={onClick}>
      <div className="user-card-name ellipsis">
        {user.displayName || "New user"}
      </div>
      <div className="user-card-data ellipsis">
        Last Update:{" "}
        {new Date(user.lastUpdate).toLocaleDateString("en", {
          second: "2-digit",
          minute: "2-digit",
          hour: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })}
      </div>

      <div className="user-card-email ellipsis">{user.email || "Unknown"}</div>
      <div className="user-card-data ellipsis">IP: {user.ip}</div>
    </div>
  );
}

export default UserListItem;
