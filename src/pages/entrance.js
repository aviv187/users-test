import React, { useRef } from "react";

import { ref, update } from "firebase/database";

function EntrancePage({ db, user, setUserData, closeDetailsPage }) {
  const displayNameRef = useRef();
  const emailRef = useRef();

  const _update = async () => {
    const displayName = displayNameRef.current.value;
    const email = emailRef.current.value;

    const userRef = ref(db, `users/${user.uid}`);
    const changeObj = { displayName, email, lastUpdate: new Date() * 1 };

    await update(userRef, changeObj);

    setUserData((oldObj) => ({ ...oldObj, ...changeObj }));

    closeDetailsPage();
  };

  return (
    <div>
      <div>
        name:
        <input type="text" ref={displayNameRef} />
      </div>
      <div>
        email:
        <input type="text" ref={emailRef} />
      </div>

      <button onClick={_update}>Continue</button>
    </div>
  );
}

export default EntrancePage;
