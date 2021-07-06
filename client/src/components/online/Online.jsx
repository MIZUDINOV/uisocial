import { noAvatar } from '../../pages/profile/Profile'
import './online.css'

export default function Online({ friend }) {
  return (
    <li className='rightbarFriend'>
      <div className='rightbarProfileImgContainer'>
        <img
          className='rightbarProfileImg'
          src={friend.profilePicture || noAvatar}
          alt='friend_avatar'
        />
        <span className='rightbarOnline'></span>
      </div>
      <span className='rightbarUsername'>{friend.username}</span>
    </li>
  )
}
