import React, { useRef } from "react";
import "./userDetailsForm.css";

function UserDetailsForm({ updateUser, defaultDisplayName, defaultEmail }) {
  const emailRef = useRef();
  const displayNameRef = useRef();

  const onSubmit = () => {
    const displayName = displayNameRef.current.value;
    const email = emailRef.current.value;

    if (displayName === "") {
      alert("Please fill the name input");
    } else if (email === "") {
      alert("Please fill the email input");
    } else {
      updateUser({ displayName, email });
    }
  };

  return (
    <div className="form">
      <div className="title">Please enter your name and email</div>

      <div className="input-label">Name:</div>
      <input
        type="text"
        ref={displayNameRef}
        defaultValue={defaultDisplayName}
      />

      <div className="input-label">Email:</div>
      <input type="email" ref={emailRef} defaultValue={defaultEmail} />

      <div className="submit-button-container">
        <button className="submit-button" onClick={onSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default UserDetailsForm;
