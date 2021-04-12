import React, { useState, useEffect } from 'react'
import { getPostsByIds } from '../utils/wp'
import { arrayShuffle } from '../utils/functions'
import FeaturedPost from './FeaturedPost'
import PostGrid from './PostGrid'
import Container from './primitives/Container'

const FeaturedPosts = ({ postIds, randomize }) => {
  const [posts, setPosts] = useState([])
  const [firstPost, setFirstPost] = useState(null)
  const [secondRow, setSecondRow] = useState(null)

  const loadPosts = () => {
    if (Array.isArray(postIds) && !posts.length) {
      // Extract the top 5 posts
      let firstPosts = [...postIds].splice(0, 7)
      // Get posts
      getPostsByIds(firstPosts).then((res) => {
        if (Array.isArray(res) && res.length) {
          const allPosts = [...res]

          // Orders
          let postsOrder = firstPosts

          // Randomize all
          if (randomize === 'all') {
            postsOrder = arrayShuffle(postsOrder)
          }

          // Randomize all but first post
          if (randomize === 'exclude_first') {
            const firstNum = postsOrder.shift()
            postsOrder = [firstNum, ...arrayShuffle(postsOrder)]
          }

          // Sort the returned posts by the order of the ids
          const allPostsSorted = postsOrder.reduce((acc, id) => {
            allPosts.forEach((item) => item.id === id && acc.push(item))
            return acc
          }, [])
          // Extract the top featured post
          const firstEl = allPostsSorted.shift()
          // const secondEls = allPostsSorted.slice(0, 2)
          const rest = allPostsSorted.slice(2)

          setFirstPost(firstEl)
          // setSecondRow(secondEls)
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
