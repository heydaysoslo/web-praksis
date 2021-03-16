import React, { useEffect, useState } from 'react'
import { getPostsFromEachTax } from '../utils/wp'
import Card from './Card'
import Box from './primitives/Box'
import Flex from './primitives/Flex'
import Container from './primitives/Container'

const SpecialPosts = (props) => {
  const [data, setData] = useState(null)
  const onMount = () => {
    getPostsFromEachTax({ perPage: 1 }).then((res) => {
      setData(res)
    })
  }
  useEffect(onMount, [])
  if (!data) {
    return null
  }
  return (
    <Container {...props}>
      <Flex flexWrap="wrap" mx={-3}>
        {data.map(({ taxonomy, posts }) => {
          return (
            <Box
              key={`post-item-${taxonomy.id}`}
              width={[1, 1, 1, 1 / 3, 1 / 3]}
              px={[3]}
              pb={[4]}
            >
              {posts.map((post) => {
                return <Card hideDate={true} key={post.id} post={post} />
              })}
              {/* <Box>
                <StyledLink as={Link} to={taxonomy.link}>
                  Alle {taxonomy.name} »
                </StyledLink>
              </Box> */}
            </Box>
          )
        })}
      </Flex>
    </Container>
  )
}

export default SpecialPosts
