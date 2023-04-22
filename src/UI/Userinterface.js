import React, { useState } from 'react';

const Userinterface = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const submitHandler = (event) => {
        event.preventDefault();
        setEmail('');
        setPassword('');
    }


    return (
        <div>
        <h3>SignUp</h3>
        <div>
            <form onSubmit={submitHandler}>
                <label>
                    Email:
                    <input type='email' value = {email} onChange={(e) => setEmail(e.target.value)} required/>
                </label>
                <label>
                    Password:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </label>
                <label>
                    Confirm Password:
                    <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                </label>
                <button type='submit'>Sign up</button>
            </form>
        </div>
        </div>
    )
}

export default Userinterface;
