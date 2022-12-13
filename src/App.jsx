import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { io } from 'socket.io-client'
import MainContext from './context/MainContext'
import Navbar from './components/Navbar'
import IndexPage from './pages/IndexPage'
import Register from './components/Register'
import Login from './components/Login'
import ProfilePage from './pages/ProfilePage'
import LikesPage from './pages/LikesPage'
import SwipePage from './pages/SwipePage'
import Footer from './components/Footer'

const socket = io.connect('http://localhost:8000')

const App = () => {
  const [user, setUser] = useState(null)
  const [currentUser, setCurrentUser] = useState('')
  const [userPictures, setUserPictures] = useState([])
  const [userData, setUserData] = useState([])
  const [userCard, setUserCard] = useState(null)
  const [matches, setMatches] = useState([])
  const [preferences, setPreferences] = useState({ city: '', sex: '', min: '', max: '' })

  const states = { socket, user, setUser, currentUser, setCurrentUser, userPictures, setUserPictures, userData, setUserData, userCard, setUserCard,
  preferences, setPreferences, matches, setMatches }

  socket.off('getData').on('getData',
   data => { setUserData(data)
  socket.emit('getOne', currentUser) })

  socket.off('getOne').on('getOne', 
    data => { setUserData(data)
  setUserPictures(data[0].pictures.length) })

  socket.on('getMatches', data => {
    setMatches(data)
  })  

  return (
    <div className='container'>
      <MainContext.Provider value={states}>
        <Router>
          <Navbar/>
            <Routes>
              <Route path='/' element={<IndexPage />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login/>} />
       
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/likes' element={<LikesPage />} />
              <Route path='/swipe' element={<SwipePage />} />
            </Routes>
        </Router>
      </MainContext.Provider>
      <Footer />
    </div>
  )
}

export default App