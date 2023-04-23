import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Welcome from "./components/Welcome";
import Header from "./components/Layout/Header";
import Profile from "./components/Profile/Profile";
import "./App.css";

function App() {

  const [isLogin, setIsLogin] = useState(false);

  // const [displayName, setDisplayName] = useState('');
  // const [photoUrl, setPhotoUrl] = useState('');

  // useEffect(() => {
  //   fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDTHcN6BfHG9yJUF7SSWSe8c7ZWnwhUxOQ',{
  //     method:'POST',
  //     body:JSON.stringify({
  //       idToken:localStorage.getItem('idToken')
  //     }),
  //     headers:{
  //       'Content-Type':'applicatio/json'
  //     }
  //   }).then((res) => {
  //     if(res.ok){
  //       return res.json();
  //     }else{
  //       return res.json((data) => {
  //         throw new Error(data.error.message)
  //       })
  //     }
  //   }).then((data) => {
  //     setDisplayName(data.displayName);
  //     setPhotoUrl(data.photoUrl)
  //   }).catch((error) => {
  //     alert(error);
  //   })
  // },[])

  return (
    <>
      <Header login ={isLogin} setLogin = {setIsLogin}/>
      <Routes>
        <Route exact path="/" element = {<SignUp/>}/>
        <Route exact path="/welcome" element = {<Welcome/>}/>
        <Route exact path="/login" element = {<Login setLogin = {setIsLogin}/>}/>
        <Route exact path="/completeprofile" element={<Profile/>} />
      </Routes>
    </>
  );
}

export default App;