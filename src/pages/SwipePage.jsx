import React, { useContext, useState, useEffect, useRef } from 'react'
import MainContext from '../context/MainContext'
// import MultiRangeSlider from 'multi-range-slider-react'

const SwipePage = () => {
  const [pictureIndex, setPictureIndex] = useState(0)
  const { user, socket, userCard, setUserCard, currentUser, preferences, setPreferences } = useContext(MainContext)
  const cityRef = useRef()
  const sexRef = useRef()
  const ageRefMin = useRef()
  const ageRefMax = useRef()
  // const [minAge, setMinAge] = useState(18)
  // const [maxAge, setMaxAge] = useState(100)
  // const handleSliderInput = (event) => {
  //   setMinAge(event.minValue)
  //   setMaxAge(event.maxValue)
  // }

  const handleDislike = () => {
    socket.emit('dislike', [currentUser, userCard.username])
    setPictureIndex(0)
  }

  const handleLike = () => {
    socket.emit('like', [currentUser, userCard.username])
    setPictureIndex(0)
  }

  useEffect(() => {
    const nextCard = setInterval(() => {
      socket.emit('getUser', [currentUser, preferences])
    }, 100)
    return () => { clearInterval(nextCard) }
  })

  socket.off('getUser').on('getUser', data => {
    if (data !== 'not found') { setUserCard(data) }
    else (setUserCard())
  })

  const applyPreferences = () => {
    if (cityRef.current.value !== '') { const pref = preferences
      pref.city = cityRef.current.value
      setPreferences(pref) } if (sexRef.current.value !== '') 
      { const pref = preferences
      pref.gender = sexRef.current.value
      setPreferences(pref) } if (ageRefMin.current.value !== '') 
      { const pref = preferences
      pref.min = ageRefMin.current.value
      setPreferences(pref) } if (ageRefMax.current.value !== '') 
      { const pref = preferences
      pref.max = ageRefMax.current.value
      setPreferences(pref)
    }
  }

  return (
    <main>
      {user.pictures.length < 2 &&
      <div className='forbidden'>
        <h3 className='closed-feature-main'>forbidden</h3>
        <p className='closed-feature'>feature requires uploading at least 2 profile pictures</p>
      </div>}

      {user.pictures.length >= 2 &&
      <div className='swipe-container'>

        <div className='filterbox'>
          <h3 className='preferences-title'>set preferences</h3>
          <div className='city-preference'>
            <select defaultValue={''} ref={cityRef}>
              <option disabled value=''>city</option>
              <option value='vilnius'>Vilnius</option>
              <option value='kaunas'>Kaunas</option>
              <option value='utena'>Utena</option>
              <option value='klaipeda'>Klaipėda</option>
              <option value='panevezys'>Panevėžys</option>
            </select>
          </div>

          <div className='sex-preference'>
            <select defaultValue={''} ref={sexRef}>
              <option disabled value=''>sex</option>
              <option value='man'>man</option>
              <option value='woman'>woman</option>
            </select>
          </div>

          <div className='age-preference'>
            <p>age: </p>
            {/* <p className='slider-numbers'>{minAge}-{maxAge}</p> */}
          </div>
              <input 
              ref={ageRefMin} type='number' min={18} max={99}
              defaultValue={''} placeholder='minimum age' className='age-ref'/>
              <input 
              ref={ageRefMax} type='number' min={18} max={99}
              defaultValue={''} placeholder='maximum age' className='age-ref'/>
              <button onClick={applyPreferences} className='filterbox-button'>apply</button>
              {/* <MultiRangeSlider
              className='age-slider'
              ruler='false'
              barInnerColor='rgb(245, 202, 194)'
              min={18}
              max={99}
              step={1}
              minValue={minAge}
              maxValue={maxAge}
              onInput={(event) => {
                handleSliderInput(event)
              }} /> */}
        </div>

        {userCard &&
        <div className='swipe-card'>
          <img src={userCard.pictures[pictureIndex]} alt='profile'/>
          <div className='swipe-text-on-image'>
            <p className='swipe-card-info'>{userCard.username}, {userCard.age}</p>
            <p className='swipe-card-info'>{userCard.city}</p>
          </div>

          <div>
            {pictureIndex > 0 &&
            <button
            className='swipe-picture-switch-button-left'
            onClick={() => { setPictureIndex(pictureIndex - 1) }}>←</button>}
            {pictureIndex === 0 && <button className='swipe-disabled-button-left'>←</button>}

            {pictureIndex < userCard.pictures.length - 1 && 
            <button
            className='swipe-picture-switch-button-right'
            onClick={() => { setPictureIndex(pictureIndex + 1) }}>→</button>}
            {pictureIndex === userCard.pictures.length &&
            <button className='swipe-disabled-button-right'>→</button>}
            {pictureIndex === userCard.pictures.length -1 &&
            <button className='swipe-disabled-button-right'>→</button>}

            <button onClick={handleDislike} className='dislike-button'>👎</button>
            <button onClick={handleLike} className='like-button'>👍</button>
          </div>

        </div>}
        {!userCard && <h2>that's all for now</h2>}
      </div>}
    </main>
  )
}

export default SwipePage