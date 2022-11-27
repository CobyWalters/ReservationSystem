import React from "react"
import Header from "../components/Header";
import InputSection from "../components/InputSection";
import OutputSection from "../components/OutputSection";
import { useState } from "react"

const HomePage = () => {
    const [chosenDate, setChosenDate] = useState(new Date())
    const [chosenPartySize , setChosenPartySize] = useState(1);
    const [loggedIn , setLoggedIn] = useState(false);
    const [points , setPoints] = useState(0)

    return(
        <div>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} points={points} setPoints={setPoints}/>
            <InputSection chosenDate={chosenDate} setChosenDate={setChosenDate} setChosenPartySize={setChosenPartySize}/>
            <OutputSection chosenDate={chosenDate} chosenPartySize={chosenPartySize} loggedIn={loggedIn}/>
        </div>
    )
}

export default HomePage;