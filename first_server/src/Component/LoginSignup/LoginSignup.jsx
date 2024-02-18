import React, { useState } from 'react'
import './LoginSignup.css'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email22.png'



const LoginSignup = () => {

  const [action,setAction] = useState("Guest Account");

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">

        <div className="input">
        <img src={user_icon} alt="" />
          <input type="text" placeholder='Enter your name here' />
        </div>

        <div className="input">
        <img src={email_icon} alt="" />
          <input type="email" placeholder='enter your email here'/>
        </div>

      </div>
      <div className="submit-container">
        <div className={action==="Guest Account"?"submit gray":"submit"} onclick={()=>{setAction("login")}}>Login</div>
      </div>
    </div>
  )
}

export default LoginSignup
