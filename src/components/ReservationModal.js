import React, { useState } from "react"
import "./ReservationModal.css"


const ReservationModal = ({ ccRequired ,setName, setOpenConfirmationModal, loggedIn, closeModal, reservationTime, reservationDate , reservationParty }) => {
    return(
        <div className="modalBackground">
            <div className={`${loggedIn ? "loggedInModalContainer" : "modalContainer"} ${ccRequired ? "longModalContainer" : "shortModalContainer"}`}>
                <button className="titleButton" onClick={()=>{closeModal(false)}}>X</button>
                <div className="title">
                    {!loggedIn && <h1>We just need a little bit of info to make this reservation...</h1>}
                    {loggedIn && <h1>You are aleady logged in, so just verify this reservation information</h1>}
                    <h2 className="reservationInfo">{reservationDate.getMonth()+1}/{reservationDate.getDate()}/{reservationDate.getFullYear()}, {reservationTime}</h2>
                    <h2 className="reservationInfo">{reservationParty} Guest(s)</h2>
                </div>
                {!loggedIn && <div className="body">
                    <input className="input"placeholder="Username"></input>
                    <input className="input"placeholder="Password"></input>
                    {ccRequired && <input className="input"placeholder="Credit Card Number"></input>}
                    {ccRequired &&<input className="input"placeholder="Expiration (MM/YY)"></input>}
                    <button onClick={()=>{setOpenConfirmationModal(true); closeModal(false); setName("Logged In User")}} className="logInButton">Log In and Make Reservation</button>
                    <h1>Or</h1>
                    <input id="name" className="input"placeholder="First Name"></input>
                    <input className="input"placeholder="Last Name"></input>
                    <input className="input"placeholder="Phone Number"></input>
                    <input className="input"placeholder="Email"></input>                    
                </div>
                }
                <div className="footer">
                    {ccRequired && <input className="input"placeholder="Credit Card Number"></input>}
                    {ccRequired &&<input className="input"placeholder="Expiration (MM/YY)"></input>}
                    <button onClick={()=>{setOpenConfirmationModal(true); closeModal(false); setName(document.getElementById("name").value)}} className="finishReservationButton">Finish Reservation</button>
                </div>
            </div>
        </div>
    )
}

export default ReservationModal;