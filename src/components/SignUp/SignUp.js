import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import VerifyEmail from "../VerifyEmail/VerifyEmail";

const SignUp = () => {
  const [isVerify, setIsVerify] = useState(false);
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    if (enteredPassword !== inputConfirmPasswordRef.current.value) {
      alert("Password should be same");
      return;
    }
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTHcN6BfHG9yJUF7SSWSe8c7ZWnwhUxOQ",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        header: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("Successfully Registered");
        console.log("Succcessfully Registered");
        setIsVerify(true);
        return res.json();
      } else {
        return res.json().then((data) => {
          alert(data.error.message);
        });
      }
    }).then((data) =>{
      localStorage.setItem("idToken", data.idToken);
      console.log(data);
      let id = data.idToken;

      fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDTHcN6BfHG9yJUF7SSWSe8c7ZWnwhUxOQ",{
        method:"POST",
        body: JSON.stringify({
          requestType:"VERIFY_EMAIL",
          idToken:id,
        }),
        headers:{
          "Content-Type":"application/json",
        }
      }).then((res) => {
        if(res.ok){
          console.log("OTP sent");
          console.log(res,"response")
        }else{
          return res.json().then((data) => {
            alert('Somthing went wrong');
          });
        }
      });
    });
  };

  return (
    <div className="signUpBody">
      <form onSubmit={submitHandler} className="form">
        <h4>SignUp</h4>
        <div>
          <input
            type="email"
            placeholder="Email"
            required
            ref={inputEmailRef}
            autoComplete="on"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            required
            ref={inputPasswordRef}
            autoComplete="on"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            ref={inputConfirmPasswordRef}
            autoComplete="on"
          />
        </div>
        <div>
          <button className="signUpBtn">SignUp</button>
        </div>
        <div className="tologin">
          <p>
            Already Registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
      <div>{isVerify && <VerifyEmail />}</div>
    </div>
  );
};

export default SignUp;