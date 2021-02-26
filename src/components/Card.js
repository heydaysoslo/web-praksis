import React from 'react'
import renderHTML from 'react-render-html'
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
        {post.featured_image ? (
          <AcfBgset image={post.featured_image} aspect="landscape" />
        ) : (
          <div className="StickiesSlider__image aspect aspect--landscape" />
        )}
        <Box mt={2}>
          <Text date={post.date} as={PostDate} size="small" />
        </Box>
        <Heading mt={1} mb={0} as="h2" size="h3">
          {renderHTML(title?.rendered)}
        </Heading>
        {excerpt?.rendered && (
          <Text mt={2} size="excerpt">
            {renderHTML(excerpt.rendered)}
          </Text>
        )}
      </Link>
    </div>
  )
}

export default Card
