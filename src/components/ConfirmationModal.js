import React, { useState } from "react"
import "./ConfirmationModal.css"

const ConfirmationModal = ( {name, reservationDate , reservationParty, reservationTime, closeConfirmationModal}) => {
    return(
        <div className="confirmationModalBackground">
            <div className="confirmationModalContainer">
                <button className="titleButton" onClick={()=>{closeConfirmationModal(false)}}>X</button>
                <div className="title">
                    <h1>Your Reservation is Confirmed!</h1>
                </div>
                <div className="body">
                    <h2 className="reservationInfo">{name}</h2>
                    <h2 className="reservationInfo">{reservationDate.getMonth()+1}/{reservationDate.getDate()}/{reservationDate.getFullYear()}, {reservationTime}</h2>
                    <h2 className="reservationInfo">{reservationParty} Guest(s)</h2>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;