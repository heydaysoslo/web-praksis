import React from 'react'
import Card from './Card'
import Box from './primitives/Box'
import Flex from './primitives/Flex'

const getItemSize = (count) => {
  if (count === 3) {
    return { xs: 1, md: 1 / 3 }
  }
  if (count === 4) {
    return { xs: 1, md: 1 / 2, lg: 1 / 3, xl: 1 / 4 }
  }
  return [1, 1, 1 / 2, 1 / 2, 1 / 3, 1 / 4]
}

const PostGrid = ({ posts, itemProps, itemSize }) => {
  const _itemSize = itemSize || getItemSize(posts?.length)
  return (
    <Flex flexWrap="wrap" mx={-3} mt={4}>
      {posts.map((p) => (
        <Box key={`post-item-${p.id}`} width={_itemSize} px={[3]} pb={[4]}>
          <Card {...itemProps} post={p} />
        </Box>
      ))}
    </Flex>
  )
}

export default PostGrid
