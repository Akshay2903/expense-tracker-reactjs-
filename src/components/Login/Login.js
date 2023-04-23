import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";


const Login = () => {

    const loginEmailRef = useRef();
    const loginPasswordRef = useRef();
    const navigate = useNavigate();

    const loginSubmitHandler = (event) => {
        event.preventDefault();

        const enteredloginEmail = loginEmailRef.current.value;
        const enteredloginPassword = loginPasswordRef.current.value;

        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTHcN6BfHG9yJUF7SSWSe8c7ZWnwhUxOQ",
            {
              method: "POST",
              body: JSON.stringify({
                email: enteredloginEmail,
                password: enteredloginPassword,
                returnSecureToken: true,
              }),
            }
          )
          .then((res) => {
            if(res.ok){
                alert("Login success");
                console.log("Login success", res);
                return res.json();
            } else{
                return res.json().then((data) => {
                    alert(data.error.message);
                    throw new Error(data.error.message);
                })
            }
          })
          .then((data) => {
            console.log(data);
            navigate("/welcome");
            // localStorage.setItem("TokenID Expense", data.idToken);
            console.log("data", data);
          })
          .catch((error) =>{
            alert("Something went wrong")
            console.log("Something went wrong");
          })

    };
    return (
        <div className="loginBody">
          <form onSubmit={loginSubmitHandler} className="form">
          <h1>Login</h1>
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                ref={loginEmailRef}
                autoComplete='on'
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                required
                ref={loginPasswordRef}
                autoComplete='on'
              />
            </div>
            <div>
              <button className="LoginBtn">Login</button>
            </div>
            <span className="tosignup">
              <p>
                Don't have Account? <Link to="/login">Sign Up</Link>
              </p>
            </span>
          </form>
        </div>
      );
    };

export default Login;
