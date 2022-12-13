import React, { useContext } from 'react'
import MainContext from '../context/MainContext'

const LikesPage = () => {
  const { user } = useContext(MainContext)

  return (
    <div>
      {user.pictures.length < 2 &&
        <div className='forbidden'>
          <h3 className='closed-feature-main'>forbidden</h3>
          <p className='closed-feature'>feature requires uploading at least 2 profile pictures</p>
        </div>}

      {user.pictures.length >= 2 &&
      <h2 className='nope'>nope</h2>}
  </div>
  )
}

export default LikesPage