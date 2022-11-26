import React from "react"
import Logo from "../assets/Restaurant_Logo.jpg"
import "./Header.css"

const Header = () => {
    return(
        <div>
            <div className="headerContainer">
                <img className="logo" src={Logo} alt="logo for restaurant"/>
                <h1 className="restaurantName">Pizza De Papa</h1>
                <div className="spacer"></div>
                <button className="headerButton">Sign Up</button>
                <button className="headerButton">Log In</button>
            </div>
            <hr className="dividerLine"/>
            </div>
    )
}

export default Header;