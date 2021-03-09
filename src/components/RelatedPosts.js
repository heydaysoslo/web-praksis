import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getRelatedPosts } from '../utils/wp'
import Container from './primitives/Container'
import Box from './primitives/Box'
import PostGrid from './PostGrid'
import Loading from './Loading'
import Heading from './primitives/Heading'

const RelatedPosts = ({ post }) => {
  const [posts, setPosts] = useState(null)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const inViewEvent = () => {
    if (inView) {
      getRelatedPosts(post).then((res) => {
        console.log(res)
        setPosts(res)
      })
    }
  }

  useEffect(inViewEvent, [inView])

  // Improvements
  // Add all read articles to context and exclude from related

  return (
    <Container ref={ref}>
      <Heading as="h2" textAlign="center" size="h2">
        Les også…
      </Heading>
      <Box pb={6}>
        {!posts && <Loading title="Laster artikler" />}
        {posts && <PostGrid posts={posts} />}
      </Box>
    </Container>
  )
}

export default RelatedPosts
