import React from 'react'
import Card from './Card'
import Box from './primitives/Box'
import Flex from './primitives/Flex'

const PostGrid = ({ posts }) => {
  return (
    <Flex flexWrap="wrap" mx={-3} mt={4}>
      {posts.map((p) => (
        <Box
          key={`post-item-${p.id}`}
          width={[1, 1, 1 / 2, 1 / 2, 1 / 3, 1 / 4]}
          px={[3]}
          pb={[4]}
        >
          <Card post={p} />
        </Box>
      ))}
    </Flex>
  )
}

export default PostGrid
