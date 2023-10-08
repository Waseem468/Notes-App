import React from 'react'
import '../styles/landing.css';

const landingPage = () => {
    return (
        <div className='main-container'>
            <h1 style={{ color: "white",marginBottom:"30px" }}>WELCOME TO OUR NOTES APP ENTER YOUR NOTES CREDENTIALS BELOW</h1>
            <div className="notes">
                <div >
                    <input className='note-title' type="text" placeholder='Enter Note Title' />
                </div>
                <div >
                    <textarea className='note-desc' name="" id="" cols="30" rows="10" placeholder='Desription'></textarea>
                </div>
                <button className='note-btn'>ADD NOTES</button>
            </div>

        </div>
    )
}

export default landingPage
