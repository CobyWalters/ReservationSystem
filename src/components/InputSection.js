import React, { useState } from "react"
import "./InputSection.css"
import DatePicker from 'react-date-picker'


const InputSection = () => {
    const [value, onChange] = useState(new Date())
    return(
        <div className="inputSectionContainer">
            <select className="partySelector">
                <option selected value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
            </select>
            <DatePicker onChange={onChange} value={value}className="dateSelector"/>
        </div>
    )
}

export default InputSection;