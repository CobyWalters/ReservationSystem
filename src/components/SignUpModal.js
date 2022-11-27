import React, { useState } from "react"
import "./SignUpModal.css"


const SignUpModal = ({ closeModal }) => {
    return(
        <div className="signUpModalBackground">
            <div className="signUpModalContainer">
                <button className="titleButton" onClick={()=>{closeModal(false)}}>X</button>
                <div className="title">
                    <h1>Enter your new account information</h1>
                </div>
                <div className="body">
                    <input className="input"placeholder="New Username"></input>
                    <input className="input"placeholder="New Password"></input>
                    <input className="input"placeholder="First Name"></input>
                    <input className="input"placeholder="Last Name"></input>
                    <input className="input"placeholder="Phone Number"></input>
                    <input className="input"placeholder="Email"></input>
                    <button className="signUpButton">Sign Up</button>
                </div>
            </div>
        </div>
    )

}


export default SignUpModal;