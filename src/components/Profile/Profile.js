import React, { useRef } from 'react';
import "./Profile.css";

const Profile = () => {

    const fullNameRef = useRef();
    const profileUrlRef = useRef();
    const generateToken = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 32; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      };

    const tokenId = localStorage.setItem('idToken', generateToken);

    console.log(tokenId);

    const profileUpdateHandler = (e) => {
        e.preventDefault();

        const enteredFullName = fullNameRef.current.value;
        const enteredProfileUrl = profileUrlRef.current.value;

        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDTHcN6BfHG9yJUF7SSWSe8c7ZWnwhUxOQ",
            {
                method: "POST",
                body: JSON.stringify({
                    idToken: tokenId,
                    displayName: enteredFullName,
                    photoUrl: enteredProfileUrl,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                  },
            }
        ).then((res) => {
            if(res.ok){
                alert("Profile Updated");
                return res.json();
            } else {
                return res.json((data) => {
                  console.log(data, "----error-data");
                  alert(data.error.message);
                });
              }
        })
    };


  return (
    <div className='profile'>
        <form className='form' onSubmit={profileUpdateHandler}>
            <h2>Conatct Details</h2>
            <div>
                <label>Full Name</label>
                <input type='text' id='fullname' ref={fullNameRef} required/>
            </div>
            <div>
                <label>Profile Photo  Url</label>
                <input type='text' id='profileURL' ref={profileUrlRef} required/>
            </div>
            <div>
                <button type='submit' className='btn'>Update</button>
            </div>
        </form>
      
    </div>
  )
}

export default Profile;
