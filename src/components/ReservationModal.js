import React, { useState } from "react"
import "./ReservationModal.css"
import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000"
})


const ReservationModal = ({ ccRequired ,setName, setOpenConfirmationModal, loggedIn, closeModal, reservationTime, reservationDate , reservationParty }) => {
    const [errors, setErrors] = useState()
    
    const handleClick_guest = async () => {
        let fN = document.getElementById("name").value;
        let lN = document.getElementById("lastName-reserve").value;
        let phone = document.getElementById("phoneNumber-reserve").value;
        let email = document.getElementById("email-reserve").value;
        let formattedDate = (reservationDate.getMonth() +1).toString() + "/" +(reservationDate.getDate()).toString() + "/" +(reservationDate.getFullYear()).toString().slice(-2)

        try { 
            const res = await api.post('reservations/add', { partySize :  reservationParty, date : formattedDate, time : reservationTime, firstName : fN, lastName : lN, phoneNumber : phone, email: email });
            setOpenConfirmationModal(true);
            setErrors();
            closeModal(false);
            setName(document.getElementById("name").value);
            console.log(res.data)
        } catch (err){
            console.log(err.response.data);
            setErrors(err.response.data);
        }
    }

    const handleClick_logging_in = async () => {
        let usernameReservation = document.getElementById("user-reservation").value;
        let passwordReservation = document.getElementById("pass-reservation").value;
        console.log(usernameReservation);
        console.log(passwordReservation)
        
        let formattedDate = (reservationDate.getMonth() +1).toString() + "/" +(reservationDate.getDate()).toString() + "/" +(reservationDate.getFullYear()).toString().slice(-2)

        try { 
            const res = await api.post('users/login', { username: usernameReservation, hashedPassword : passwordReservation });
            console.log("Logged In")
            setErrors();
            //TRY TO RESERVE
            //if successfull 
            //setOpenConfirmationModal(true); closeModal(false); setName("Logged In User")
        } catch (err){
            console.log(err.response.data);
            setErrors(err.response.data);
        }
    }

    return(
        <div className="modalBackground">
            <div className={`${loggedIn ? "loggedInModalContainer" : "modalContainer"} ${ccRequired ? "longModalContainer" : "shortModalContainer"}`}>
                <button className="titleButton" onClick={()=>{closeModal(false)}}>X</button>
                <div className="title">
                    {!loggedIn && <h1>We just need a little bit of info to make this reservation...</h1>}
                    {loggedIn && <h1>You are aleady logged in, so just verify this reservation information</h1>}
                    {ccRequired && <p style={{fontSize : "12px"}}>A hold fee of $10 is required to hold on to your reservation, no-shows will lose their hold fee</p>}
                    <h2 className="reservationInfo">{reservationDate.getMonth()+1}/{reservationDate.getDate()}/{reservationDate.getFullYear()}, {reservationTime}</h2>
                    <h2 className="reservationInfo">{reservationParty} Guest(s)</h2>
                    <h3 className="errors">{errors}</h3>
                </div>
                {!loggedIn && <div className="body">
                    <input id="user-reservation" className="input"placeholder="Username"></input>
                    <input id="pass-reservation" className="input"placeholder="Password"></input>
                    {ccRequired && <input className="input"placeholder="Credit Card Number"></input>}
                    {ccRequired &&<input className="input"placeholder="Expiration (MM/YY)"></input>}
                    <button onClick={handleClick_logging_in} className="logInButton">Log In and Make Reservation</button>
                    <h1 style={{fontSize : "20px"}}>Or</h1>
                    <input id="name" className="input"placeholder="First Name"></input>
                    <input id= "lastName-reserve" className="input"placeholder="Last Name"></input>
                    <input id= "phoneNumber-reserve" className="input"placeholder="Phone Number"></input>
                    <input id= "email-reserve" className="input"placeholder="Email"></input>                    
                </div>
                }
                <div className="footer">
                    {ccRequired && <input className="input"placeholder="Credit Card Number"></input>}
                    {ccRequired &&<input className="input"placeholder="Expiration (MM/YY)"></input>}
                    <button onClick={handleClick_guest} className="finishReservationButton">Finish Reservation</button>
                </div>
            </div>
        </div>
    )
}

export default ReservationModal;