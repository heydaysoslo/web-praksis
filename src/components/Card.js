import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import AcfBgset from './AcfBgset'
import PostDate from './PostDate'
import Box from './primitives/Box'
import Heading from './primitives/Heading'
import Text from './primitives/Text'

const Card = ({ post }) => {
  const { link, title, excerpt } = post
  return (
    <div>
      <Link to={link}>
        <Box bg="grays.0">
          {post.featured_image ? (
            <AcfBgset image={post.featured_image} aspect="landscape" />
          ) : (
            <div className="aspect aspect--landscape" />
          )}
        </Box>
        <Box mt={2}>
          <Text date={post.date} as={PostDate} size="small" />
        </Box>
        <Heading mt={1} mb={0} as="h2" size="h3">
          {ReactHtmlParser(title?.rendered)}
        </Heading>
        {excerpt?.rendered && (
          <Text mt={2} size="excerpt">
            {ReactHtmlParser(excerpt.rendered)}
          </Text>
        )}
      </Link>
    </div>
  )
}

export default Card
