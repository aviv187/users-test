import React, { useState } from "react";
import UserPopup from "./user-popup";
import UserListItem from "./userListItem";
import "./usersList.css";

function UsersList({ users }) {
  const [focusedUser, setFocusedUser] = useState(null);

  return (
    <div className="users-list-container">
      <div className="list-title">Online Users:</div>
      <div className="users-list">
        {users.map((user) => (
          <UserListItem
            user={user}
            key={`user_${user.key}`}
            onClick={() => setFocusedUser(user)}
          />
        ))}
      </div>

      {focusedUser && (
        <UserPopup user={focusedUser} onClose={() => setFocusedUser(null)} />
      )}
    </div>
  );
}

export default UsersList;
