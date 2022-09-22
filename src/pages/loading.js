import React from "react";
import "./loading.css";

function LoadingPage() {
  return (
    <div className="center">
      <h2>Signing in, please wait...</h2>
      <div className="animated-loader"></div>
    </div>
  );
}

export default LoadingPage;
