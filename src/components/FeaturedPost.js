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
import TaxonomyLabel from './TaxonomyLabel'

const StyledBgSet = styled(AcfBgset)`
  min-height: 100%;
  height: 100%;
`

const FeaturedPost = ({ post }) => {
  const { title, excerpt, link, featured_image } = post
  return (
    <>
      <Flex alignItems="stretch" flexWrap="wrap">
        <Box
          width={{ xs: 1, md: 1 / 2, lg: 8 / 12 }}
          style={{ position: 'relative' }}
        >
          <Link to={link}>
            {featured_image ? (
              <StyledBgSet image={featured_image} aspect="landscape" />
            ) : (
              <div className="aspect aspect--landscape" />
            )}
          </Link>
        </Box>
        <Box
          width={{ xs: 1, md: 1 / 2, lg: 4 / 12 }}
          bg="grays.0"
          p={[3, null, 4]}
          borderTopRightRadius={[null, null, 1]}
          borderBottomRightRadius={[1]}
          borderBottomLeftRadius={[1, null]}
        >
          <Flex flexDirection="column" minHeight="100%">
            <TaxonomyLabel post={post} />
            <Link to={link}>
              {title?.rendered && (
                <Heading size="h2" as="h2">
                  {HtmlParser(post.title.rendered)}
                </Heading>
              )}
            </Link>
            {excerpt?.rendered && (
              <Box marginTop="auto">
                <Text>{HtmlParser(post.excerpt.rendered)}</Text>
              </Box>
            )}
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default FeaturedPost
