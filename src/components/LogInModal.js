import React, { useState } from "react"
import "./LogInModal.css"
import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000"
})




const LogInModal = ({ closeModal, setLoggedIn, setPoints }) => {
    const [errors, setErrors] = useState()
    
    const handleClick = async () => {
        let user = document.getElementById("username-login").value;
        let pass =document.getElementById("password-login").value;

        try { 
            const res = await api.post('/users/login', { username :  user, hashedPassword : pass})
            setLoggedIn(true);
            setPoints(res.data.points);
            closeModal(false)
        } catch (err){
            console.log(err.response.data);
            setErrors(err.response.data);
        }
    }

    return(
        <div className="logInModalBackground">
            <div className="logInModalContainer">
                <button className="titleButton" onClick={()=>{closeModal(false)}}>X</button>
                <div className="title">
                    <h1>Enter your log in information</h1>
                </div>
                <h3 className="errors">{errors}</h3>
                <div className="body">
                    <input id="username-login" className="input"placeholder="Username"></input>
                    <input id="password-login" className="input"placeholder="Password"></input>
                    <button onClick={handleClick} className="logInButton">Log In</button>
                </div>
            </div>
        </div>
    )

}

export default LogInModal;