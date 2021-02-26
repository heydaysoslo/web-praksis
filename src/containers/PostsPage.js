import React, { useState, useEffect } from 'react'
import { getPosts } from '../utils/wp'

import Post from '../components/Post'

const PostsPage = ({ match }) => {
  const [posts, setPosts] = useState([])

  const fetchPosts = () => {
    const page = match?.params?.page || 1
    getPosts(page).then((res) => {
      setPosts(res)
    })
  }

  useEffect(fetchPosts, [match?.params?.page])

  return (
    <div className="main">
      <div className="container">
        <div className="cards">
          {posts && posts.map((p) => <Post key={p.id} post={p} />)}
        </div>
      </div>
    </div>
  )
}

export default PostsPage
