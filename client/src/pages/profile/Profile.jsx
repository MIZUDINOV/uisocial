import React from 'react'

import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import axios from 'axios'
import { useParams } from 'react-router-dom'

import './profile.css'

export const noAvatar =
  'https://res.cloudinary.com/esperson/image/upload/v1625578328/AvatarsFromUsers/noProfilePicture_wnz4dd.png'
export const noCover =
  'https://res.cloudinary.com/esperson/image/upload/v1625578345/AvatarsFromUsers/noCover_czgqqr.png'

export default function Profile() {
  const [user, setUser] = React.useState(null)

  const { username } = useParams()

  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data)
    }
    fetchUser()
  }, [username])

  return (
    <>
      <Topbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                className='profileCoverImg'
                src={user?.coverPicture || noCover}
                alt=''
              />
              <img
                className='profileUserImg'
                src={user?.profilePicture || noAvatar}
                alt=''
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>{user?.username}</h4>
              <span className='profileInfoDesc'>{user?.desc}</span>
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}
