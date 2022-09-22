import React, { useState } from "react";
import UserListItem from "./userListItem";
import "./usersList.css";

function UsersList({ users }) {
  const [focusedUser, setFocusedUser] = useState(null);

  console.log(focusedUser);

  return (
    <div>
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
    </div>
  );
}

export default UsersList;
