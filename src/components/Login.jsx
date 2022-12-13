import MainContext from '../context/MainContext'
import React, { useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../api/http'

const Login = () => {
  const nav = useNavigate()
  const { setUser } = useContext(MainContext)
  const loginUsernameRef = useRef()
  const loginPasswordRef = useRef()
  const [errorMessage, setErrorMessage] = useState('')

  const loginUser = async () => {
    setErrorMessage('')
    const data = {
      username: loginUsernameRef.current.value,
      password: loginPasswordRef.current.value
    }
    console.log(data)
    const res = await post('login', data)
    console.log(res)
    if (res.error === false) {
      setUser(res.data)
      loginUsernameRef.current.value = ''
      loginPasswordRef.current.value = ''
      nav('/profile')
    }
    if (res.error === true) setErrorMessage(res.message)
  }

  return (
      <main className='login-register-form'>
        <h3>sign in here</h3>
        <div>
          <input
          type={'text'}
          ref={loginUsernameRef}
          placeholder={'enter username'} />

          <input
          type={'password'}
          ref={loginPasswordRef}
          placeholder={'enter password'} />

          <button onClick={loginUser}>sign in</button>
          <p>not a memba? sign up <a href='/register' style={{ textDecoration: 'underline' }}>here</a></p>
        </div>
          <p style={{
            color: 'white',
            fontSize: '16px',
            backgroundColor: 'red',
            borderRadius: '15px',
            padding: '0 5px 0',
            marginTop: '5px'
            }}>{errorMessage}
          </p>
      </main>
  )
}

export default Login