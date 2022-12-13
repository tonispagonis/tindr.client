import React, { useContext } from 'react'
import MainContext from '../context/MainContext'
import { Link, useNavigate } from 'react-router-dom'
import { get } from '../api/http'

const Navbar = () => {
  const nav = useNavigate()
  const { user, setUser } = useContext(MainContext)

  const logOut = async () => {
    const data = { username: setUser.username }
    const res = await get('logout', data)
    console.log(res.message)
    setUser(false)
    localStorage.clear()
    nav('/')
  }

  return (    
      <nav>
        <div>
          <Link to='/'><h1>tindr.</h1></Link>
        </div>
        {user ? (  
        <div>
          <Link className='nav-link-logged' to='/profile'>profile</Link>
          
          <Link className='nav-link-logged' to='/likes'>likes</Link>
          <Link className='nav-link-logged' to='/swipe'>swipe</Link>
          
          <Link onClick={logOut} className='nav-link logout-button' to='/logout'>sign out</Link>
        </div>  
        ) : (
        <div>
          <Link className='nav-link' to='/register'>register</Link>
          <Link className='nav-link login-button' to='/login'>sign in</Link>
        </div>
        )}
      </nav>
  )
}

export default Navbar

