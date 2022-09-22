import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA-7JJLTHljJly7nemBwlEOnBRzLzB89NQ",
  authDomain: "users-test-dc75a.firebaseapp.com",
  databaseURL: "https://users-test-dc75a-default-rtdb.firebaseio.com",
  projectId: "users-test-dc75a",
  storageBucket: "users-test-dc75a.appspot.com",
  appId: "1:1022742445116:web:f80089e9f35b6737e5d739",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase();

ReactDOM.render(
  <React.StrictMode>
    <App firebase={firebase} db={database} />
  </React.StrictMode>,
  document.getElementById("root")
);
