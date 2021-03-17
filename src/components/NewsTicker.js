import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { getPosts } from '../utils/wp'
import PostDate from './PostDate'
import Box from './primitives/Box'
import Flex from './primitives/Flex'
import Text from './primitives/Text'
import HtmlParser from 'react-html-parser'

const Bullet = styled.span(
  ({ theme }) => css`
    display: inline-block;
    border-radius: 99px;
    background: ${theme.colors.red};
    width: 1rem;
    height: 1rem;
  `
)

const TickerItem = styled(Box)(
  ({ theme }) => css`
    &:hover {
      background-color: ${theme.colors.grays[0]};
    }
  `
)

const PostTitle = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  span {
    white-space: nowrap;
  }
`

const NewsTicker = () => {
  const [posts, setPosts] = useState(null)
  const onMount = () => {
    getPosts(1, 6).then((res) => {
      setPosts(res)
    })
  }
  useEffect(onMount, [])
  return (
    <Flex height={{ xs: '6rem', lg: '6.5rem' }} overflow="hidden" border={1}>
      <Box width={['85px', null, '115px']} bg="grays.0" px={2}>
        <Bullet />
        <PostTitle as="h3" size="small">
          Siste nytt
        </PostTitle>
      </Box>
      <Box
        width={['calc(100% - 100px)', null, 'calc(100% - 115px)']}
        flexGrow="1"
        flexShrink="1"
      >
        <Flex display="inline-flex" overflow="scroll" height="80px">
          {posts &&
            posts.map((post) => {
              return (
                <TickerItem
                  as={Link}
                  to={post.link}
                  width={['75%', null, '45%', null, '22.5%']}
                  flexShrink="0"
                  px={2}
                  pt={0}
                  pb={1}
                  borderLeft={1}
                >
                  <Text date={post.date} as={PostDate} size="small" />
                  <PostTitle as="h4" size="small">
                    <span>{HtmlParser(post.title.rendered)}</span>
                  </PostTitle>
                </TickerItem>
              )
            })}
        </Flex>
      </Box>
    </Flex>
  )
}

export default NewsTicker
