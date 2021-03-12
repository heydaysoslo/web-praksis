import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import AcfBgset from './AcfBgset'
import TaxonomyLabel from './TaxonomyLabel'
import PostDate from './PostDate'
import Box from './primitives/Box'
import Heading from './primitives/Heading'
import Text from './primitives/Text'

const StyledCard = styled(Link)(
  ({ theme }) => css`
    display: block;
    &:hover {
      ${Text}, ${Heading} {
        color: ${theme.colors.red};
      }
    }
  `
)

const Card = ({ post, taxonomy, className, hideDate }) => {
  const { link, title, excerpt } = post
  return (
    <StyledCard className={className} to={link}>
      <Box bg="grays.0">
        {post.featured_image ? (
          <AcfBgset image={post.featured_image} aspect="landscape" />
        ) : (
          <div className="aspect aspect--landscape" />
        )}
      </Box>
      <Box mt={2}>
        {!hideDate && <Text date={post.date} as={PostDate} size="small" />}
        <TaxonomyLabel post={post} taxonomy={taxonomy} />
      </Box>
      <Heading mt={1} mb={0} as="h2" size="h3">
        {ReactHtmlParser(title?.rendered)}
      </Heading>
      {excerpt?.rendered && (
        <Text mt={2} size="excerpt">
          {ReactHtmlParser(excerpt.rendered)}
        </Text>
      )}
    </StyledCard>
  )
}

export default Card
