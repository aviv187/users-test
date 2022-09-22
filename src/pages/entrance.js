import React from "react";

import { ref, update } from "firebase/database";
import UserDetailsForm from "../components/userDetailsForm";

function EntrancePage({ db, user, setUserData, closeDetailsPage }) {
  const _update = async ({ displayName, email }) => {
    const userRef = ref(db, `users/${user.uid}`);
    const changeObj = { displayName, email, lastUpdate: new Date() * 1 };

    await update(userRef, changeObj);

    setUserData((oldObj) => ({ ...oldObj, ...changeObj }));

    closeDetailsPage();
  };

  return (
    <div className="center">
      <UserDetailsForm updateUser={_update} />
    </div>
  );
}

export default EntrancePage;
