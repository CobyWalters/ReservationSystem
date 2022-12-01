import React, { useState } from "react"
import "./SignUpModal.css"
import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000"
})



const SignUpModal = ({ setUsernameState, setPasswordState,closeModal ,setLoggedIn, setPoints }) => {

    const [errors, setErrors] = useState()
    
    const handleClick = async () => {
        let user = document.getElementById("username").value;
        let pass =document.getElementById("password").value;
        let fN = document.getElementById("firstName").value;
        let lN = document.getElementById("lastName").value;
        let phone = document.getElementById("phoneNumber").value;
        let email = document.getElementById("email").value;

        try { 
            const res = await api.post('/users/add', { username :  user, hashedPassword : pass, firstName : fN, lastName : lN, email : email, phoneNumber: phone })
            setErrors();
            setPoints(0);
            setLoggedIn(true);
            closeModal(false);
            setUsernameState(user);
            setPasswordState(pass);
        } catch (err){
            console.log(err.response.data);
            setErrors(err.response.data);
        }
    }

    return(
        <div className="signUpModalBackground">
            <div className="signUpModalContainer">
                <button className="titleButton" onClick={()=>{closeModal(false)}}>X</button>
                <div className="title">
                    <h1>Enter your new account information</h1>
                </div>
                <h3 className="errors">{errors}</h3>
                <div className="body">
                    <input id="username" className="input"placeholder="New Username"></input>
                    <input id="password" className="input"placeholder="New Password"></input>
                    <input id="firstName" className="input"placeholder="First Name"></input>
                    <input id="lastName" className="input"placeholder="Last Name"></input>
                    <input id="phoneNumber" className="input"placeholder="Phone Number"></input>
                    <input id="email" className="input"placeholder="Email"></input>
                    <button onClick={handleClick} className="signUpButton">Sign Up</button>
                </div>
            </div>
        </div>
    )

}


export default SignUpModal;