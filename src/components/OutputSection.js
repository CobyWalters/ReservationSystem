import React from "react"
import "./OutputSection.css"
import times from "../assets/times"
import { useState } from "react"
import ReservationModal from "./ReservationModal"


const OutputSection = ( {chosenDate , chosenPartySize} ) => {
    const [openModal, setOpenModal] = useState(false);
    const [timeOptions, setTimeOptions] = React.useState(times);
    const [chosenTime, setChosenTime] = React.useState("10:00 AM")

    const timeElements = timeOptions.map(timeOption => (
        <button onClick= {timeOption.isAvailable? ()=>{setOpenModal(true); setChosenTime(timeOption.time)} : undefined}  key={timeOption.id} className={`${timeOption.isAvailable ? "timeButton" : "grayedOut"}`}>
            {timeOption.time}
        </button>
    ))

    return(
        <div>
            <h1 className="lunchHeader">Reservation Times For A Party Of <span className="highlight">{chosenPartySize}</span> On <span className="highlight">{chosenDate.getMonth()+1}/{chosenDate.getDate()}/{chosenDate.getFullYear()}</span></h1>
            {timeElements}
            {openModal && <ReservationModal reservationTime={chosenTime} reservationDate={chosenDate} reservationParty={chosenPartySize} closeModal={setOpenModal}/>}
        </div>
    )
}

export default OutputSection;