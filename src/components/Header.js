import React from "react"
import Logo from "../assets/Restaurant_Logo.jpg"
import "./Header.css"
import { useState } from "react"
import LogInModal from "./LogInModal"
import SignUpModal from "./SignUpModal"

const Header = ({ setPasswordState, setUsernameState , loggedIn , setLoggedIn, points , setPoints}) => {
    const [openLogInModal, setOpenLogInModal] = useState(false);
    const [openSignUpModal, setOpenSignUpModal] = useState(false);
    return(
        <div>
            <div className="headerContainer">
                <img className="logo" src={Logo} alt="logo for restaurant"/>
                <h1 className="restaurantName">Pizza De Papa</h1>
                <div className="spacer"></div>
                {!loggedIn && <button onClick= {()=>{setOpenSignUpModal(true)}} className="headerButton">Sign Up</button>}
                {!loggedIn && <button onClick= {()=>{setOpenLogInModal(true)}} className="headerButton">Log In</button>}
                {loggedIn && <h2 className="points">Points Balance : {points}</h2>}
                {loggedIn && <button onClick={()=>{setLoggedIn(false); setPasswordState(); setUsernameState()}} className="headerButton">Sign Out</button>}
            </div>
            <hr className="dividerLine"/>
            {openLogInModal && <LogInModal setPasswordState={setPasswordState} setUsernameState={setUsernameState} setLoggedIn={setLoggedIn} setPoints={setPoints} closeModal={setOpenLogInModal}/>}
            {openSignUpModal && <SignUpModal setPasswordState={setPasswordState} setUsernameState={setUsernameState} setLoggedIn={setLoggedIn} setPoints={setPoints} closeModal={setOpenSignUpModal}/>}
            </div>
    )
}

export default Header;