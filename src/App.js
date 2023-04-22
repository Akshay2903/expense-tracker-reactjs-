import React from "react";
import Userinterface from "./UI/Userinterface";
import * as firebase from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBTfXvi1tVHKZcVR6xtXr9mxE2CpARRcqk",
  authDomain: "noreply@expense-tracker-6d2aa.firebaseapp.com",
  databaseURL: "https://expense-tracker-6d2aa-default-rtdb.firebaseio.com/",
  projectId: "expense-tracker-6d2aa",
};

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div>
      <Userinterface/>
    </div>
  );
}

export default App;
