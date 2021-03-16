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
  const perPage = 3

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
      <Box borderTop="1" mb={[3, null, null, 4]} />
      <Heading as="h2" size="h2">
        Les også…
      </Heading>
      <Box mb={[5, null, 6]}>
        {!posts && (
          <Box minHeight="400px">
            <Loading title="Laster artikler" />
          </Box>
        )}
        {posts && <PostGrid mt={{ xs: 4 }} posts={posts} />}
      </Box>
    </Container>
  )
}

export default RelatedPosts
