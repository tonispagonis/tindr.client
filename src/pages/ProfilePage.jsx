import React, { useRef, useState, useContext } from 'react'
import MainContext from '../context/MainContext'

const ProfilePage = () => {
  const { user, socket, userPictures, setUserPictures } = useContext(MainContext)
  const [pictureIndex, setPictureIndex] = useState(0)
  const pictureRef = useRef()

  const uploadPicture = () => {
    socket.emit('uploadPicture', { 
      username: user.username, 
      newPicture: pictureRef.current.value
    })
    setUserPictures(userPictures + 1)
    setPictureIndex(user.pictures.length)
    pictureRef.current.value = ''
  }

  const deletePicture = () => {
    socket.emit('deletePicture', {
      username: user.username,
      picture: user.pictures[pictureIndex]
    })
    setUserPictures(userPictures - 1)
    setPictureIndex(0)
  }

  return (
    <div className='container'>
      <div className='user-container'>
        <div className='user-card'>
          <img src={user.pictures[pictureIndex]} alt='profile'/>
          <div className='text-on-image'>
            <p className='card-info'>{user.username}, {user.age}</p>
            <p className='card-info'>{user.city}</p>
          </div>
        </div>
      </div>
          <input
          ref={pictureRef}
          className='profile-img-input'
          type='url'
          placeholder='enter picture URL: http://...'/>

        <div className='buttons'>
          <button onClick={uploadPicture} className='upload-button'>upload</button>
          {pictureIndex > 0 &&
          <button
          className='picture-switch-button'
          onClick={() => { setPictureIndex(pictureIndex - 1) }}>←</button>}
          {pictureIndex === 0 && <button className='disabled-button'>←</button>}

          <button
          className='picture-delete-button'
          onClick={deletePicture}>delete</button>

          {pictureIndex < user.pictures.length - 1 && 
          <button
          className='picture-switch-button'
          onClick={() => { setPictureIndex(pictureIndex + 1) }}>→</button>}
          {pictureIndex === user.pictures.length &&
          <button className='disabled-button'>→</button>}
          {pictureIndex === user.pictures.length -1 &&
          <button className='disabled-button'>→</button>}
        </div>  

        <div className='pictures-count'>
          <p>pictures currently rocking: <span style={{ color: 'teal', fontWeight: 'bold', fontSize: '18px' }}>{user.pictures.length}</span></p>
        </div>
    </div>
  )
}

export default ProfilePage