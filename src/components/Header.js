import React from "react"
import Logo from "../assets/Restaurant_Logo.jpg"
import "./Header.css"
import { useState } from "react"
import LogInModal from "./LogInModal"
import SignUpModal from "./SignUpModal"

const Header = () => {
    const [openLogInModal, setOpenLogInModal] = useState(false);
    const [openSignUpModal, setOpenSignUpModal] = useState(false);
    return(
        <div>
            <div className="headerContainer">
                <img className="logo" src={Logo} alt="logo for restaurant"/>
                <h1 className="restaurantName">Pizza De Papa</h1>
                <div className="spacer"></div>
                <button onClick= {()=>{setOpenSignUpModal(true)}} className="headerButton">Sign Up</button>
                <button onClick= {()=>{setOpenLogInModal(true)}} className="headerButton">Log In</button>
            </div>
            <hr className="dividerLine"/>
            {openLogInModal && <LogInModal closeModal={setOpenLogInModal}/>}
            {openSignUpModal && <SignUpModal closeModal={setOpenSignUpModal}/>}
            </div>
    )
}

export default Header;