import React from "react";
import { Routes, Route } from "react-router-dom";

import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Welcome from "./components/Welcome";
import Header from "./components/Layout/Header";
import Profile from "./components/Profile/Profile";
import "./App.css";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route exact path="/" element = {<SignUp/>}/>
        <Route exact path="/welcome" element = {<Welcome/>}/>
        <Route exact path="/login" element = {<Login/>}/>
        <Route exact path="/completeprofile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;