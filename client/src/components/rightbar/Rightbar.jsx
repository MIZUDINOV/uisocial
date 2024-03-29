import React from 'react'

import Online from '../online/Online'
import { AuthContext } from '../../contextStore/AuthContext'
import { noAvatar } from '../../pages/profile/Profile'
import { Add, Remove } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'

import axios from 'axios'

import './rightbar.css'

export default function Rightbar({ user }) {
  const { user: currentUser } = React.useContext(AuthContext)
  const [friends, setFriends] = React.useState([])

  React.useEffect(() => {
    if (user?._id) {
      const fetchFriends = async () => {
        const friendsList = await axios.get(
          `/users/friends/${user ? user._id : currentUser._id}`
        )
        setFriends(friendsList.data)
      }
      fetchFriends()
    }
  }, [user, user?._id, user?.followings, currentUser._id])

  const HomeRightbar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img className='birthdayImg' src='assets/gift.png' alt='' />
          <span className='birthdayText'>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className='rightbarAd' src='assets/ad.png' alt='' />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='rightbarFriendList'>
          {friends &&
            friends.map((friend) => (
              <Online key={friend._id} friend={friend} />
            ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [followed, setFollowed] = React.useState(
      currentUser.followings.includes(user?._id)
    )

    React.useEffect(() => {
      setFollowed(currentUser.followings?.includes(user?._id))
    }, [currentUser.followings, user?._id])

    const onFollowAndUnfollow = async () => {
      try {
        setIsLoading(true)
        if (!followed && user._id) {
          await axios.put(`/users/${user._id}/follow`, {
            userId: currentUser._id,
          })

          setFollowed(true)
        } else {
          user._id &&
            (await axios.put(`/users/${user._id}/unfollow`, {
              userId: currentUser._id,
            }))

          setFollowed(false)
        }
        setIsLoading(false)
      } catch (error) {}
    }

    return (
      <>
        {currentUser._id !== user._id && (
          <div className='rightbarFollowButton'>
            <button className='rightbarButton' onClick={onFollowAndUnfollow}>
              {followed ? 'Unfollow' : 'Follow'}
              {followed ? isLoading || <Remove /> : isLoading || <Add />}
              {isLoading && (
                <CircularProgress style={{ color: 'white' }} size={20} />
              )}
            </button>
          </div>
        )}

        <h4 className='rightbarTitle'>User information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City:</span>
            <span className='rightbarInfoValue'>
              {user ? user.city || '-' : currentUser.city}
            </span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From:</span>
            <span className='rightbarInfoValue'>
              {user ? user.from || '-' : currentUser.from}
            </span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User friends</h4>
        {friends ? (
          <div className='rightbarFollowings'>
            {friends.map((friend) => (
              <div className='rightbarFollowing' key={friend._id}>
                <img
                  src={friend.profilePicture || noAvatar}
                  alt='friend_avatar'
                  className='rightbarFollowingImg'
                />
                <span className='rightbarFollowingName'>{friend.username}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>У Вас пока нет друзей :(</p>
        )}
      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
