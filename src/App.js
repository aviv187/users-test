import React, { useEffect, useState } from "react";
import "./App.css";

import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

import {
  get,
  increment,
  onDisconnect,
  ref,
  set,
  update,
} from "firebase/database";

function App({ firebase, db }) {
  const [user, setUser] = useState(undefined);

  const [signingIn, setSigningIn] = useState(true);

  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user_) => {
      if (user_) {
        // update online users in rtdb
        const userRef = ref(db, `users/${user_.uid}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            update(userRef, {
              lastVisited: new Date() * 1,
              lastUpdate: new Date() * 1,
              online: increment(1),
              visits: increment(1),
              userAgent: navigator.userAgent,
            });
            const data = snapshot.val();

            console.log("data", data);
          } else {
            console.log(
              "user does not exist, show registration form and create user in db"
            );

            set(userRef, { visits: 1, created: new Date() * 1, online: 1 });
          }
        });
        onDisconnect(ref(db, `users/${user_.uid}`)).update({
          online: increment(-1),
          lastExit: new Date() * 1,
        });
        setUser(user_);
      } else {
        setUser(null);
      }
    });
  }, [db, firebase]);

  useEffect(() => {
    if (user === null) {
      setSigningIn(true);
      signInAnonymously(getAuth(firebase));
    } else if (user) {
      setSigningIn(false);
    }
  }, [user, db, firebase]);

  return (
    <div>
      {signingIn && "signingIn"}
      {user?.uid}
    </div>
  );
}

export default App;
