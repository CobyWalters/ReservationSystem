import React, { useState } from "react"
import "./ReservationModal.css"
import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000"
})


const ReservationModal = ({  usernameState, passwordState,ccRequired ,setName, setOpenConfirmationModal, loggedIn, closeModal, reservationTime, reservationDate , reservationParty }) => {
    const [errors, setErrors] = useState()
    
    const handleClick_guest = async () => {
        let fN = document.getElementById("name").value;
        let lN = document.getElementById("lastName-reserve").value;
        let phone = document.getElementById("phoneNumber-reserve").value;
        let email = document.getElementById("email-reserve").value;
        let formattedDate = (reservationDate.getMonth() +1).toString() + "/" +(reservationDate.getDate()).toString() + "/" +(reservationDate.getFullYear()).toString().slice(-2)

        try { 
            const res = await api.post('reservations/add', { partySize :  reservationParty, date : formattedDate, time : reservationTime, firstName : fN, lastName : lN, phoneNumber : phone, email: email });
            setOpenConfirmationModal(true);
            setErrors();
            closeModal(false);
            setName(document.getElementById("name").value);
            console.log(res.data)
        } catch (err){
            console.log(err.response.data);
            setErrors(err.response.data);
        }
    }

    const handleClick_signing_up = async () => {
        let user = document.getElementById("username-new").value;
        let pass =document.getElementById("password-new").value;
        let fN = document.getElementById("firstName-new").value;
        let lN = document.getElementById("lastName-new").value;
        let phone = document.getElementById("phoneNumber-new").value;
        let email = document.getElementById("email-new").value;
        console.log(user);
        console.log(pass);
        
        let formattedDate = (reservationDate.getMonth() +1).toString() + "/" +(reservationDate.getDate()).toString() + "/" +(reservationDate.getFullYear()).toString().slice(-2)

        try { 
            const res = await api.post('/users/add', { username :  user, hashedPassword : pass, firstName : fN, lastName : lN, email : email, phoneNumber: phone })
            console.log("Signed Up")
            setErrors();
            //TRY TO RESERVE
            try {
                const res2 = await api.post('reservations/reserveWhenLoggedIn', { username: user, partySize : reservationParty, date : formattedDate, time: reservationTime,   });
                setOpenConfirmationModal(true);
                closeModal(false);
                setName("Logged In User");
            } catch (err2){
                console.log(err2.response.data);
                setErrors(err2.response.data);
            }
            //if successfull 
            //setOpenConfirmationModal(true); closeModal(false); setName("Logged In User")
        } catch (err){
            console.log(err.response.data);
            setErrors(err.response.data);
        }
    }

    const handleClick_loggedIn = async () => {
        let formattedDate = (reservationDate.getMonth() +1).toString() + "/" +(reservationDate.getDate()).toString() + "/" +(reservationDate.getFullYear()).toString().slice(-2)

        try { 
            const res = await api.post('reservations/reserveWhenLoggedIn', { username: usernameState, password : passwordState,partySize : reservationParty, date : formattedDate, time: reservationTime });
            console.log("Logged In")
            setErrors();
            //TRY TO RESERVE
            //if successfull 
            setOpenConfirmationModal(true);
            closeModal(false);
            setName("Logged In User")
        } catch (err){
            console.log(err.response.data);
            setErrors(err.response.data);
        }
    }

    return(
        <div className="modalBackground">
            <div className={`${loggedIn ? "loggedInModalContainer" : "modalContainer"} ${ccRequired ? "longModalContainer" : "shortModalContainer"}`}>
                <button className="titleButton" onClick={()=>{closeModal(false)}}>X</button>
                <div className="title">
                    {!loggedIn && <h1>We just need a little bit of info to make this reservation...</h1>}
                    {loggedIn && <h1>You are aleady logged in, so just verify this reservation information</h1>}
                    {ccRequired && <p style={{fontSize : "12px"}}>A hold fee of $10 is required to hold on to your reservation, no-shows will lose their hold fee</p>}
                    <h2 className="reservationInfo">{reservationDate.getMonth()+1}/{reservationDate.getDate()}/{reservationDate.getFullYear()}, {reservationTime}</h2>
                    <h2 className="reservationInfo">{reservationParty} Guest(s)</h2>
                    <h3 className="errors">{errors}</h3>
                </div>
                {!loggedIn && <div className="body">
                <input id="username-new" className="input"placeholder="New Username"></input>
                    <input id="password-new" className="input"placeholder="New Password"></input>
                    <input id="firstName-new" className="input"placeholder="First Name"></input>
                    <input id="lastName-new" className="input"placeholder="Last Name"></input>
                    <input id="phoneNumber-new" className="input"placeholder="Phone Number"></input>
                    <input id="email-new" className="input"placeholder="Email"></input>
                    {ccRequired && <input className="input"placeholder="Credit Card Number"></input>}
                    {ccRequired &&<input className="input"placeholder="Expiration (MM/YY)"></input>}
                    <button onClick={handleClick_signing_up} className="signUpButton">Sign Up and Make Reservation</button>
                    <h1 style={{fontSize : "20px", margin:"2px"}}>Or</h1>
                    <input id="name" className="input"placeholder="First Name"></input>
                    <input id= "lastName-reserve" className="input"placeholder="Last Name"></input>
                    <input id= "phoneNumber-reserve" className="input"placeholder="Phone Number"></input>
                    <input id= "email-reserve" className="input"placeholder="Email"></input>                    
                </div>
                }
                <div className="footer">
                    {ccRequired && <input className="input"placeholder="Credit Card Number"></input>}
                    {ccRequired &&<input className="input"placeholder="Expiration (MM/YY)"></input>}
                    <button onClick={loggedIn ? handleClick_loggedIn:handleClick_guest} className="finishReservationButton">Finish Reservation</button>
                </div>
            </div>
        </div>
    )
}

export default ReservationModal;