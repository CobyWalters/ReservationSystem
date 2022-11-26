import React from "react"
import "./OutputSection.css"
import times from "../assets/times"
import { useState } from "react"
import ReservationModal from "./ReservationModal"


const OutputSection = () => {
    const [openModal, setOpenModal] = useState(false);
    
    const [timeOptions, setTimeOptions] = React.useState(times)

    const timeElements = timeOptions.map(timeOption => (
        <button onClick= {()=>{setOpenModal(true)}}key={timeOption.id} className="timeButton">
            {timeOption.time}
        </button>
    ))

    return(
        <div>
            <h1 className="lunchHeader">Lunch</h1>
            {timeElements}
            {openModal && <ReservationModal closeModal={setOpenModal}/>}
        </div>
    )
}

export default OutputSection;