import React from 'react'
import Box from './primitives/Box'
import Container from './primitives/Container'

const RelatedPosts = (post) => {
  return (
    <Container>
      <Box pb={6}>
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </Box>
    </Container>
  )
}

export default RelatedPosts
