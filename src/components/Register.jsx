// import MainContext from '../context/MainContext'
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../api/http'

const Register = () => {
  const nav = useNavigate()
  const registerUsernameRef = useRef()
  const registerPassword1Ref = useRef()
  const registerPassword2Ref = useRef()
  const registerCityRef = useRef()
  const registerSexRef = useRef()
  const registerAgeRef = useRef()
  const [errorMessage, setErrorMessage] = useState('')

  const registerUser = async () => {
    setErrorMessage('')
    const data = {
      username: registerUsernameRef.current.value,
      password1: registerPassword1Ref.current.value,
      password2: registerPassword2Ref.current.value,
      city: registerCityRef.current.value,
      sex: registerSexRef.current.value,
      age: registerAgeRef.current.value
    }

    const res = await post('register', data)
    console.log(res)
    if (res.error === true) setErrorMessage(res.message)
    if (res.error === false) {
      nav('/login')
    }
  }
    
  return (
    <main className='login-register-form'>
      <h3>become a memba</h3>
      <div>
        <input
        type='text'
        placeholder='enter username'
        ref={registerUsernameRef} />

        <input
        type='password'
        placeholder='enter password'
        ref={registerPassword1Ref} />

        <input
        type='password'
        placeholder='confirm password'
        ref={registerPassword2Ref} />

        <select ref={registerCityRef} defaultValue={''}>
          <option disabled value=''>choose city</option>
          <option value='Vilnius'>Vilnius</option>
          <option value='Kaunas'>Kaunas</option>
          <option value='Utena'>Utena</option>
          <option value='Klaipėda'>Klaipėda</option>
          <option value='Panevėžys'>Panevėžys</option>
        </select>

        <select ref={registerSexRef} defaultValue={''}>
          <option disabled value=''>choose sex</option>
          <option value='man'>man</option>
          <option value='woman'>woman</option>
        </select>

        <input
        className='age-input' type='number' min={18} max={99}
        placeholder='enter your age' ref={registerAgeRef} />
        
        <button onClick={registerUser}>sign up</button>
        <p>already a memba? sign in <a href='/login' style={{ textDecoration: 'underline' }}>here</a></p>
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

export default Register


