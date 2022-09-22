import React from "react";
import "./welcome.css";

function Welcome({ userData }) {
  return <div className="welcome-message">Hey {userData?.displayName} </div>;
}

export default Welcome;
