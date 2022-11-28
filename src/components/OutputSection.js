import React from "react"
import "./OutputSection.css"
import { useState } from "react"
import ReservationModal from "./ReservationModal"
import ConfirmationModal from "./ConfirmationModal"


const OutputSection = ( {timeOptions, chosenDate , chosenPartySize, loggedIn} ) => {
    const [openModal, setOpenModal] = useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [chosenTime, setChosenTime] = useState("10:00 AM");
    const [name, setName] = useState("");

    const timeElements = timeOptions.map(timeOption => (
        <button onClick= {timeOption.isAvailable? ()=>{setOpenModal(true); setChosenTime(timeOption.time)} : undefined}  key={timeOption.id} className={`${timeOption.isAvailable ? "timeButton" : "grayedOut"}`}>
            {timeOption.time}
        </button>
    ))

    return(
        <div>
            <h1 className="lunchHeader">Reservation Times For A Party Of <span className="highlight">{chosenPartySize}</span> On <span className="highlight">{chosenDate.getMonth()+1}/{chosenDate.getDate()}/{chosenDate.getFullYear()}</span></h1>
            {timeElements}
            {openModal && <ReservationModal setName={setName} setOpenConfirmationModal={setOpenConfirmationModal} loggedIn={loggedIn} reservationTime={chosenTime} reservationDate={chosenDate} ccRequired={true} reservationParty={chosenPartySize} closeModal={setOpenModal}/>}
            {openConfirmationModal && <ConfirmationModal name={name} reservationTime={chosenTime} reservationDate={chosenDate} reservationParty={chosenPartySize} closeConfirmationModal={setOpenConfirmationModal}></ConfirmationModal>}
        </div>
    )
}

export default OutputSection;