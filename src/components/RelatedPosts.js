import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getRelatedPosts } from '../utils/wp'
import Container from './primitives/Container'
import Box from './primitives/Box'
import PostGrid from './PostGrid'
import Loading from './Loading'
import Heading from './primitives/Heading'
import useLocalStorage from '../hooks/useLocalStorage'

const RelatedPosts = ({ post }) => {
  const [posts, setPosts] = useState(null)
  const [readArticles] = useLocalStorage('readArticles', [])
  const perPage = 4

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const inViewEvent = () => {
    if (inView) {
      getRelatedPosts({
        post,
        exclude: [post.id, ...readArticles],
        perPage,
      }).then((res) => {
        if (res.length < perPage) {
          //
        } else {
          setPosts(res)
        }
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
        {!posts && (
          <Box minHeight="400px">
            <Loading title="Laster artikler" />
          </Box>
        )}
        {posts && <PostGrid posts={posts} />}
      </Box>
    </Container>
  )
}

export default RelatedPosts
