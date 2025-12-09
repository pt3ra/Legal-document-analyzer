import React from 'react'
import google_icon from '../../assets/google.svg'
import apple_icon from '../../assets/apple.svg'

const socialLogin = () => {
  return (
    <div className="social-login">
        <button className="social-button">
            <img src={google_icon} alt="" className="social-icon" />Google</button>
        
        <button className="social-button">
            <img src={apple_icon} alt="" className="social-icon" />Apple</button>
    </div>
  )
}

export default socialLogin