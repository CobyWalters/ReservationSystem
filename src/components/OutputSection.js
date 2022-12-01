import React from "react"
import "./OutputSection.css"
import { useState } from "react"
import ReservationModal from "./ReservationModal"
import ConfirmationModal from "./ConfirmationModal"


const OutputSection = ( { usernameState, passwordState, holdFeeNeeded ,timeOptions, chosenDate , chosenPartySize, loggedIn} ) => {
    const [openModal, setOpenModal] = useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [chosenTime, setChosenTime] = useState("10:00 AM");
    const [name, setName] = useState("");

    const timeElements = timeOptions.map(timeOption => (
        <button onClick= {timeOption.availability? ()=>{setOpenModal(true); setChosenTime(timeOption.timeSlot)} : undefined}  key={timeOption.id} className={`${timeOption.availability ? "timeButton" : "grayedOut"}`}>
            {timeOption.timeSlot}
        </button>
    ))

    return(
        <div>
            {timeElements.length !== 0 && <h1 className="lunchHeader">Reservation Times For A Party Of <span className="highlight">{chosenPartySize}</span> On <span className="highlight">{chosenDate.getMonth()+1}/{chosenDate.getDate()}/{chosenDate.getFullYear()}</span>{holdFeeNeeded && <span className="highlight_cc">&emsp;&emsp;&emsp;*Credit Card Hold Required</span>}</h1>}
            {timeElements.length=== 0 &&  <h1 className="lunchHeader">Pick A Date and Party Size!</h1>}
            <div>
                {timeElements}
            </div>
            {openModal && <ReservationModal usernameState={usernameState} passwordState={passwordState} setName={setName} setOpenConfirmationModal={setOpenConfirmationModal} loggedIn={loggedIn} reservationTime={chosenTime} reservationDate={chosenDate} ccRequired={holdFeeNeeded} reservationParty={chosenPartySize} closeModal={setOpenModal}/>}
            {openConfirmationModal && <ConfirmationModal name={name} reservationTime={chosenTime} reservationDate={chosenDate} reservationParty={chosenPartySize} closeConfirmationModal={setOpenConfirmationModal}></ConfirmationModal>}
        </div>
    )
}

export default OutputSection;