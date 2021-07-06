import React from 'react'

import './share.css'
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'

import { AuthContext } from '../../contextStore/AuthContext'

import axios from 'axios'

export default function Share() {
  const [desc, setDesc] = React.useState('')
  const [file, setFile] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const { user } = React.useContext(AuthContext)

  const onUploadPostImgAndCreatePost = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    const newPost = {
      userId: user._id,
      desc,
    }
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'uisocialpreset')
      try {
        const { data } = await axios.post(
          'http://api.cloudinary.com/v1_1/esperson/upload',
          formData
        )
        newPost.img = data.secure_url
        newPost.imgId = data.public_id
      } catch (error) {
        console.log(error)
      }
    }
    try {
      await axios.post('/posts', newPost)
      setDesc('')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            className='shareProfileImg'
            src={
              user.profilePicture
                ? user.profilePicture
                : '/assets/person/noProfilePicture.png'
            }
            alt='avatar'
          />
          <input
            onChange={(e) => setDesc(e.target.value)}
            placeholder={`What's in your mind ${user.username}?`}
            className='shareInput'
            value={desc}
          />
        </div>
        <hr className='shareHr' />
        <form className='shareBottom' onSubmit={onUploadPostImgAndCreatePost}>
          <div className='shareOptions'>
            <label htmlFor='file'>
              <div className='shareOption'>
                <PermMedia htmlColor='tomato' className='shareIcon' />
                <span className='shareOptionText'>Photo or Video</span>
                <input
                  style={{ display: 'none' }}
                  type='file'
                  id='file'
                  accept='.png,.jpeg,.jpg'
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </label>

            <div className='shareOption'>
              <Label htmlColor='blue' className='shareIcon' />
              <span className='shareOptionText'>Tag</span>
            </div>
            <div className='shareOption'>
              <Room htmlColor='green' className='shareIcon' />
              <span className='shareOptionText'>Location</span>
            </div>
            <div className='shareOption'>
              <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className='shareOptionText'>Feelings</span>
            </div>
          </div>
          <button className='shareButton' type='submit'>
            {isLoading ? (
              <CircularProgress size={15} style={{ color: 'white' }} />
            ) : (
              'Share'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
