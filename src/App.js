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
import EntrancePage from "./pages/entrance";

function App({ firebase, db }) {
  const [user, setUser] = useState(undefined);
  const [userData, setUserData] = useState(null);

  const [signingIn, setSigningIn] = useState(true);
  const [showUserDetailsForm, setShowUserDetailsForm] = useState(false);

  const [ip, setIP] = useState("detecting");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api.ipify.org?format=jsonp";
    window.callback = (data) => {
      setIP(data?.ip || "unknown");
    };
    document.head.appendChild(script);
  }, []);

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
            setUserData(data);

            if (!data.email || !data.displayName) {
              setShowUserDetailsForm(true);
            }
          } else {
            console.log(
              "user does not exist, show registration form and create user in db"
            );
            setShowUserDetailsForm(true);
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

  useEffect(() => {
    if (user != null && ip !== "unknown") {
      const userRef = ref(db, `users/${user.uid}`);
      update(userRef, { ip });
    }
  }, [user, ip, db]);

  if (signingIn) {
    return <div>signingIn</div>;
  }

  return showUserDetailsForm ? (
    <EntrancePage
      db={db}
      user={user}
      setUserData={setUserData}
      closeDetailsPage={() => setShowUserDetailsForm(false)}
    />
  ) : (
    <div>show main page {userData?.displayName}</div>
  );
}

export default App;
