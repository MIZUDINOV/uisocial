import React from 'react'
import { Link } from 'react-router-dom'

import { MoreVert } from '@material-ui/icons'
import './post.css'

import { format } from 'timeago.js'
import axios from 'axios'
import { AuthContext } from '../../contextStore/AuthContext'
import { noAvatar } from '../../pages/profile/Profile'
import FavoriteIcon from '@material-ui/icons/Favorite'

export default function Post({ post }) {
  const [user, setUser] = React.useState({})
  const [like, setLike] = React.useState(post.likes.length)
  const [isLiked, setIsLiked] = React.useState(false)

  const { user: currentUser } = React.useContext(AuthContext)

  React.useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [post.likes, currentUser._id])

  //get a user
  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`)
      setUser(res.data)
    }
    fetchUser()
  }, [post.userId])

  const likeHandler = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id })
      setLike(isLiked ? like - 1 : like + 1)
      setIsLiked(!isLiked)
    } catch (error) {
      console.log('Ирор:', error.response)
    }
  }
  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`profile/${user.username}`}>
              <img
                className='postProfileImg'
                src={user.profielPicture ? user.profilePicture : noAvatar}
                alt=''
              />
            </Link>
            <span className='postUsername'>
              {currentUser._id === post.userId
                ? currentUser.username
                : user.username}
            </span>
            <span className='postDate'>{format(post.createdAt)}</span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.desc}</span>
          {post.img && (
            <img className='postImg' src={post?.img} alt='post_image' />
          )}
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <FavoriteIcon
              style={{ cursor: 'pointer' }}
              color={isLiked ? 'secondary' : 'primary'}
              onClick={likeHandler}
            />
            <span className='postLikeCounter'>{like}</span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
