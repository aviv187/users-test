import React, { useEffect, useMemo, useState } from "react";
import "./main.css";

import { onValue, ref } from "firebase/database";
import UsersList from "../components/usersList";
import Welcome from "../components/welcome";
import ChangeDetailsButton from "../components/changeDetailsButton";

function MainPage({ userData, user, db, changeDetails }) {
  const [users, setUsers] = useState([]);

  const onlineUsers = useMemo(() => users.filter((u) => u.online > 0), [users]);

  useEffect(() => {
    // make sure user exists (user will be undefined when app is first loaded and null if the user is logged out or there was an error signing in))
    if (!user) {
      return;
    }

    console.log("fetch list of users");
    const onlineRef = ref(db, "users");
    onValue(onlineRef, (snapshot) => {
      const data = snapshot.val();
      setUsers(
        Object.keys(data || {}).map((key) => {
          return {
            key,
            ...data[key],
          };
        })
      );
      console.log("users data:", data);
    });
  }, [user, db]);

  return (
    <div className="main-page">
      <Welcome userData={userData} />
      <ChangeDetailsButton onClick={changeDetails} />

      <UsersList users={onlineUsers} />
    </div>
  );
}

export default MainPage;
