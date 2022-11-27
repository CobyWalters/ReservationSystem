import React, { useState } from "react"
import "./LogInModal.css"

const LogInModal = ({ closeModal, setLoggedIn, setPoints }) => {
    return(
        <div className="logInModalBackground">
            <div className="logInModalContainer">
                <button className="titleButton" onClick={()=>{closeModal(false)}}>X</button>
                <div className="title">
                    <h1>Enter your log in information</h1>
                </div>
                <div className="body">
                    <input className="input"placeholder="Username"></input>
                    <input className="input"placeholder="Password"></input>
                    <button onClick={()=>{setLoggedIn(true); setPoints(100); closeModal(false)}} className="logInButton">Log In</button>
                </div>
            </div>
        </div>
    )

}

export default LogInModal;