import React, { useState } from "react"
import "./InputSection.css"
import DatePicker from 'react-date-picker'
import axios from 'axios'
import { Result } from "express-validator"

const api = axios.create({
    baseURL: "http://localhost:5000"
})


const InputSection = ({ setHoldFeeNeeded,setTimeOptions,setChosenDate, chosenDate, setChosenPartySize }) => {
    const handleClick = async () => {
        let Party = parseInt(document.getElementById("party").value);
        let Date = (chosenDate.getMonth() +1).toString() + "/" +(chosenDate.getDate()).toString() + "/" +(chosenDate.getFullYear()).toString().slice(-2);
        setChosenPartySize(document.getElementById("party").value);
        try {
            const res = await api.post('/reservations/getOpenSlots', { partySize : Party , date : Date });
            setTimeOptions(res.data.timeSlots)
            setHoldFeeNeeded(res.data.holdFee)
        } catch(err){
            console.log(err.response.data);
        }
    }

    const addDays= () =>{
        let day = new Date();
        day.setDate(day.getDate() +60);
        return day;
    }

    return(
        <div className="inputSectionContainer">
            <div className="partyWrapper">
                <label className="partyLabel">Party Size</label>
                <select defaultValue={"0"} onChange={handleClick} className="partySelector" id="party">
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
                    <option value="6">6 People</option>
                    <option value="7">7 People</option>
                    <option value="8">8 People</option>
                    <option value="9">9 People</option>
                    <option value="10">10 People</option>
                </select>
            </div>
            <div className="dateWrapper">
                <label className="dateLabel">Date</label>
                <DatePicker minDate={new Date()} maxDate={addDays()} onChange={setChosenDate} onCalendarClose={handleClick} value={chosenDate} className="dateSelector"/>
            </div>
            
        </div>
    )
}

export default InputSection;