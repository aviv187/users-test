import React from "react";
import "./welcome.css";

function Welcome({ userData }) {
  return (
    <div className="welcome">
      <div className="hey-message">Hey {userData?.displayName}</div>
      <div className="welcome-message">Welcome to the Users-App!</div>
    </div>
  );
}

export default Welcome;
