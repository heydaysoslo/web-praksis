import React, { useState, useEffect } from 'react'
import { getPostsByIds } from '../utils/wp'
import FeaturedPost from './FeaturedPost'
import PostGrid from './PostGrid'
import Container from './primitives/Container'

const FeaturedPosts = ({ postIds }) => {
  const [posts, setPosts] = useState([])
  const [firstPost, setFirstPost] = useState(null)

  const loadPosts = () => {
    if (Array.isArray(postIds) && !posts.length) {
      // Extract the top 5 posts
      const firstPosts = [...postIds].splice(0, 5)

      // Get posts
      getPostsByIds(firstPosts).then((res) => {
        if (Array.isArray(res) && res.length) {
          // Extract the top featured post
          const allPosts = [...res]
          const firstEl = allPosts.shift()
          setFirstPost(firstEl)
          // Add the rest of the results
          setPosts(allPosts)
        }
      })
    }
  }

  useEffect(loadPosts, [postIds])

  if (!posts && !firstPost) {
    return null
  }

  return (
    <Container>
      {firstPost && <FeaturedPost post={firstPost} />}
      {posts && <PostGrid posts={posts} />}
    </Container>
  )
}

export default FeaturedPosts
