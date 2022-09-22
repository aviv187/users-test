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
import MainPage from "./pages/main";
import LoadingPage from "./pages/loading";

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
    onAuthStateChanged(auth, async (user_) => {
      if (user_) {
        // update online users in rtdb
        const userRef = ref(db, `users/${user_.uid}`);
        const snapshot = await get(userRef);

        const currentDate = new Date() * 1;
        const userObj = {
          lastVisited: currentDate,
          lastUpdate: currentDate,
          userAgent: navigator.userAgent,
        };

        if (snapshot.exists()) {
          update(userRef, {
            online: increment(1),
            visits: increment(1),
            ...userObj,
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
          set(userRef, {
            visits: 1,
            created: currentDate,
            online: 1,
            ...userObj,
          });
        }

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
    return <LoadingPage />;
  }

  return showUserDetailsForm ? (
    <EntrancePage
      db={db}
      user={user}
      setUserData={setUserData}
      closeDetailsPage={() => setShowUserDetailsForm(false)}
    />
  ) : (
    <MainPage userData={userData} user={user} db={db} />
  );
}

export default App;
