import React from 'react'

import Post from '../post/Post'
import Share from '../share/Share'
import axios from 'axios'

import { AuthContext } from '../../contextStore/AuthContext'

import './feed.css'

export default function Feed({ username }) {
  const [posts, setPosts] = React.useState([])
  const { user } = React.useContext(AuthContext)

  React.useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/user/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`)
      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      )
    }
    fetchPosts()
  }, [username, user])

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {(!username || username === user.username) && <Share />}

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}
