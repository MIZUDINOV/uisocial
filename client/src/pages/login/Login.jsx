import React from 'react'
import { Link } from 'react-router-dom'

import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../contextStore/AuthContext'

import { CircularProgress } from '@material-ui/core'

import './login.css'

export default function Login() {
  const emailRef = React.useRef()
  const passwordRef = React.useRef()

  const { user, isFetching, dispatch } = React.useContext(AuthContext)
  console.log(user)

  const handleLogin = (e) => {
    e.preventDefault()
    loginCall(
      { email: emailRef.current.value, password: passwordRef.current.value },
      dispatch
    )
  }

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>UIsocial</h3>
          <span className='loginDesc'>
            Connect with friends and the world around you on UIsocial.
          </span>
        </div>
        <div className='loginRight'>
          <form onSubmit={handleLogin} className='loginBox'>
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
            <button className='loginButton' type='submit'>
              {isFetching ? (
                <CircularProgress style={{ color: 'white' }} size={20} />
              ) : (
                'Login'
              )}
            </button>
            <span className='loginForgot'>Forgot Password?</span>

            <button className='loginRegisterButton'>
              <Link
                to='/register'
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Create a New Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
