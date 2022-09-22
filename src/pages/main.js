import React, { useEffect, useState } from "react";
import "./main.css";

import { onValue, ref } from "firebase/database";
import Welcome from "../components/welcome";

function MainPage({ userData, user, db }) {
  const [users, setUsers] = useState([]);

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
      {users.map((user) => {
        return <div>{user.displayName}</div>;
      })}
    </div>
  );
}

export default MainPage;
