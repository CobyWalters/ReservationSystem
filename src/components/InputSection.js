import React, { useState } from "react"
import "./InputSection.css"
import DatePicker from 'react-date-picker'
import axios from 'axios'

const api = axios.create({
    baseURL: "https://4813ce08-5be9-424b-84e6-5d418513d29f.mock.pstmn.io/reservations/getOpenSlots"
})


const InputSection = ({ setTimeOptions,setChosenDate, chosenDate, setChosenPartySize }) => {
    const handleClick = () => {
        setChosenPartySize(document.getElementById("party").value);
        api.get('/').then(res => {
            console.log(res.data.times[0].time)
            setTimeOptions(res.data.times)
        })
    }

    return(
        <div className="inputSectionContainer">
            <div className="partyWrapper">
                <label className="partyLabel">Party Size</label>
                <select onChange={handleClick} className="partySelector" id="party">
                    <option selected value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
                    <option value="6">6 People</option>
                </select>
            </div>
            <div className="dateWrapper">
                <label className="dateLabel">Date</label>
                <DatePicker minDate={new Date()} maxDate={new Date("12-31-2022")} onChange={setChosenDate} value={chosenDate}className="dateSelector"/>
            </div>
            
        </div>
    )
}

export default InputSection;