import React, { useState } from "react"
import "./ReservationModal.css"


const ReservationModal = ({ closeModal, reservationTime, reservationDate , reservationParty }) => {
    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <button className="titleButton" onClick={()=>{closeModal(false)}}>X</button>
                <div className="title">
                    <h1>We just need a little bit of info to make this reservation...</h1>
                    <h2 className="reservationInfo">{reservationDate.getMonth()+1}/{reservationDate.getDate()}/{reservationDate.getFullYear()}, {reservationTime}</h2>
                    {console.log(reservationDate)}
                    <h2 className="reservationInfo">{reservationParty} Guest(s)</h2>
                </div>
                <div className="body">
                    <input className="input"placeholder="Username"></input>
                    <input className="input"placeholder="Password"></input>
                    <button className="logInButton">Log In and Make Reservation</button>
                    <h1>Or</h1>
                    <input className="input"placeholder="First Name"></input>
                    <input className="input"placeholder="Last Name"></input>
                    <input className="input"placeholder="Phone Number"></input>
                    <input className="input"placeholder="Email"></input>
                </div>
                <div className="footer">
                    <button className="finishReservationButton">Finish Reservation</button>
                </div>
            </div>
        </div>
    )
}

export default ReservationModal;