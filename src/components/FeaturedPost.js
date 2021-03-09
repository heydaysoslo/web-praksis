import React from 'react'
import styled from 'styled-components'
import HtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'

import Box from './primitives/Box'
import Flex from './primitives/Flex'
import Heading from './primitives/Heading'
import Label from './primitives/Label'
import Text from './primitives/Text'
import AcfBgset from './AcfBgset'

const StyledBgSet = styled(AcfBgset)`
  min-height: 100%;
  height: 100%;
`

const FeaturedPost = ({ post }) => {
  const { title, excerpt, link, featured_image } = post
  return (
    <Flex alignItems="stretch" flexWrap="wrap">
      <Box bg="red" width={[1, null, 8 / 12]} style={{ position: 'relative' }}>
        <Link
          to={link}
          style={{
            minHeight: '100%',
            display: 'block',
            background: 'red',
          }}
        >
          {featured_image ? (
            <StyledBgSet image={featured_image} aspect="landscape" />
          ) : (
            <div className="aspect aspect--landscape" />
          )}
        </Link>
      </Box>
      <Box
        width={[1, null, 4 / 12]}
        bg="grays.0"
        p={[3, null, 4]}
        borderTopRightRadius={[null, null, 1]}
        borderBottomRightRadius={[1]}
        borderBottomLeftRadius={[1, null]}
      >
        <Label>Kategori her</Label>
        <Link to={link}>
          {title?.rendered && (
            <Heading size="h2" as="h2">
              {HtmlParser(post.title.rendered)}
            </Heading>
          )}
          {excerpt?.rendered && (
            <Text>{HtmlParser(post.excerpt.rendered)}</Text>
          )}
        </Link>
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
      </Box>
    </Flex>
  )
}

export default FeaturedPost
