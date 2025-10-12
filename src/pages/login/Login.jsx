import React from 'react'
import './Login.css'
import assets from '../../assets/assets'

const Login = () => {
  return (
    <div className='login'>
        <img src={assets.logo_big} alt="" className="logo" />
        <from className="login-form">
          <h2>Sign Up</h2>
          <input type="text" placeholder="user name" className="form-input" required/>
          <input type="email" placeholder="E-mail"  className="form-input" />
          <input type="password" placeholder="Password"  className="form-input" />
          <button type='submit'>Sign Up</button>
          <div className="login-term">
            <input type="checkbox" className="checkbox" />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>
          <div className="login-forget">
            <p className="login-toggle">Already have an accoutn <span>click here</span></p>
          </div>
        </from>
    </div>
  )
}

export default Login