import React from "react";

import { ref, update } from "firebase/database";
import UserDetailsForm from "../components/userDetailsForm";

function EntrancePage({ db, user, setUserData, closeDetailsPage, userData }) {
  const _update = async ({ displayName, email }) => {
    const userRef = ref(db, `users/${user.uid}`);

    if (displayName !== userData?.displayName || email !== userData?.email) {
      try {
        await update(userRef, {
          displayName,
          email,
          lastUpdate: new Date() * 1,
        });
      } catch (error) {
        console.error(error);
      }

      setUserData((oldObj) => ({ ...oldObj, displayName, email }));
    }

    closeDetailsPage();
  };

  return (
    <div className="center">
      <UserDetailsForm
        updateUser={_update}
        defaultDisplayName={userData?.displayName ?? ""}
        defaultEmail={userData?.email ?? ""}
      />
    </div>
  );
}

export default EntrancePage;
