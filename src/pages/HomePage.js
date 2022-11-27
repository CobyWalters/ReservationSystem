import React from "react"
import Header from "../components/Header";
import InputSection from "../components/InputSection";
import OutputSection from "../components/OutputSection";
import { useState } from "react"

const HomePage = () => {
    const [chosenDate, setChosenDate] = useState(new Date())
    const [chosenPartySize , setChosenPartySize] = useState(1);

    return(
        <div>
            <Header />
            <InputSection chosenDate={chosenDate} setChosenDate={setChosenDate} setChosenPartySize={setChosenPartySize}/>
            <OutputSection chosenDate={chosenDate} chosenPartySize={chosenPartySize}/>
        </div>
    )
}

export default HomePage;