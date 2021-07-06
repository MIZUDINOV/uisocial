import React from 'react'
import { Link } from 'react-router-dom'

import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './register.css'

export default function Register() {
  const usernameRef = React.useRef()
  const emailRef = React.useRef()
  const passwordRef = React.useRef()
  const passwordAgainRef = React.useRef()

  const history = useHistory()

  const onRegister = async (e) => {
    e.preventDefault()
    if (passwordAgainRef.current.value !== passwordRef.current.value) {
      passwordAgainRef.current.setCustomValidity("Passwords don't  match!")
    } else {
      const user = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }
      try {
        await axios.post('/auth/register', user)
        history.push('/login')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Lamasocial</h3>
          <span className='loginDesc'>
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={onRegister}>
            <input
              placeholder='Username'
              className='loginInput'
              ref={usernameRef}
              type='text'
            />
            <input
              placeholder='Email'
              className='loginInput'
              ref={emailRef}
              type='email'
            />
            <input
              placeholder='Password'
              className='loginInput'
              ref={passwordRef}
              type='password'
            />
            <input
              placeholder='Password Again'
              className='loginInput'
              ref={passwordAgainRef}
              type='password'
            />
            <button className='loginButton' type='submit'>
              Sign Up
            </button>
            <button className='loginRegisterButton'>
              <Link to='/login'>Log into Account</Link>{' '}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
