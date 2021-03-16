import React, { useState, useEffect } from 'react'
import { getPostsByIds } from '../utils/wp'
import FeaturedPost from './FeaturedPost'
import PostGrid from './PostGrid'
import Container from './primitives/Container'

const FeaturedPosts = ({ postIds }) => {
  const [posts, setPosts] = useState([])
  const [firstPost, setFirstPost] = useState(null)
  const [secondRow, setSecondRow] = useState(null)

  const loadPosts = () => {
    if (Array.isArray(postIds) && !posts.length) {
      // Extract the top 5 posts
      const firstPosts = [...postIds].splice(0, 7)

      // Get posts
      getPostsByIds(firstPosts).then((res) => {
        if (Array.isArray(res) && res.length) {
          // Extract the top featured post
          const allPosts = [...res]
          const firstEl = allPosts.shift()
          const secondEls = allPosts.slice(0, 2)
          const rest = allPosts.slice(2)

          setFirstPost(firstEl)
          setSecondRow(secondEls)
          setPosts(rest)
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
      {secondRow && (
        <PostGrid
          mt={{ xs: 5, md: 6 }}
          itemSize={{ xs: 1, md: 1 / 2 }}
          posts={secondRow}
          itemProps={{ hideDate: true }}
        />
      )}
      {posts && (
        <PostGrid
          mt={{ xs: 4, md: 5, lg: 6 }}
          itemSize={{ xs: 1, md: 1 / 2, xl: 1 / 4 }}
          posts={posts}
          itemProps={{ hideDate: true }}
        />
      )}
    </Container>
  )
}

export default FeaturedPosts
