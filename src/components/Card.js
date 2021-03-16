import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { variant } from 'styled-system'

import AcfBgset from './AcfBgset'
import TaxonomyLabel from './TaxonomyLabel'
import PostDate from './PostDate'
import Box from './primitives/Box'
import Heading from './primitives/Heading'
import Text from './primitives/Text'
import Inline from './primitives/Inline'
import { getPostTerms } from '../utils/wp'
import Label from './primitives/Label'

const StyledCard = styled(Link)(
  ({ theme, variant }) => css`
    display: flex;
    flex-direction: column;
    min-height: 100%;
    position: relative;
    &:hover {
      ${Text}, ${Heading} {
        color: ${theme.colors.red};
      }
    }

    ${StyledSpecialLabel} {
      position: absolute;
      top: -0.9rem;
      left: 0;
      color: black;

      ${variant === 'red' &&
      css`
        background: ${theme.colors.red};
        color: ${theme.colors.white};
      `}

      ${variant === 'frame' &&
      css`
        background: ${theme.colors.white};
      `}
    }

    ${variant === 'red' &&
    css`
      ${Text}, ${Heading}, ${TaxLabel} {
        color: ${theme.colors.white};
      }
      &:hover {
        ${CardText} {
          background: ${theme.colors.reds[1]};
        }
        ${Text}, ${Heading}, ${TaxLabel} {
          color: ${theme.colors.white};
        }
      }
    `}

    ${CardText} {
      border-top: 0 !important;
    }
  `
)

const TaxLabel = styled(TaxonomyLabel)``

const CardText = styled(Box)(
  {
    flexGrow: 1,
  },
  variant({
    variants: {
      default: {
        bg: 'gray',
        px: 3,
        pb: 3,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
      },
      red: {
        bg: 'red',
        px: 3,
        pb: 3,
        border: '2px solid',
        borderColor: 'red',
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
      },
      frame: {
        px: 3,
        pb: 3,
        border: '2px solid',
        borderColor: 'grays.0',
      },
    },
  })
)

const SpecialLabel = ({ term, className }) => {
  return (
    <Label ml={3} borderRadius={1} p={2} bg="grays.0" className={className}>
      {term.name}
    </Label>
  )
}

const StyledSpecialLabel = styled(SpecialLabel)``

const getArticleVariant = (post) => {
  // Only apply variant style to articles assigned with content_type
  if (!post?.acf?.content_type) {
    return false
  }
  return post.article_style || 'default'
}

const Card = ({ post, taxonomy, className, hideDate }) => {
  const { link, title, excerpt } = post
  const variant = getArticleVariant(post)
  const terms = getPostTerms(post)
  return (
    <StyledCard variant={variant} className={className} to={link}>
      <Box bg="grays.0">
        {post.featured_image ? (
          <AcfBgset image={post.featured_image} aspect="landscape" />
        ) : (
          <div className="aspect aspect--landscape" />
        )}
        {terms?.content_type && (
          <StyledSpecialLabel term={terms?.content_type[0]} />
        )}
      </Box>
      <CardText pt={3} variant={variant}>
        <Inline gap={[2]} mt={[-2]} ml={[-2]}>
          {!hideDate && (
            <div>
              <Text
                color="grays.1"
                date={post.date}
                as={PostDate}
                size="small"
              />
            </div>
          )}
          <TaxLabel post={post} taxonomy={taxonomy} />
        </Inline>
        <Heading mt={1} mb={0} as="h2" size="h3">
          {ReactHtmlParser(title?.rendered)}
        </Heading>
        {excerpt?.rendered && (
          <Text mt={2} size="excerpt">
            {ReactHtmlParser(excerpt.rendered)}
          </Text>
        )}
      </CardText>
    </StyledCard>
  )
}

export default Card
