import React from 'react'
import Box from './primitives/Box'
import Container from './primitives/Container'
import Heading from './primitives/Heading'

const Loading = ({ title }) => {
  return (
    <Container>
      <Box my={[5]}>
        <Heading textAlign="center" as="p" size="h3">
          {title || 'Laster...'}
        </Heading>
      </Box>
    </Container>
  )
}

export default Loading
