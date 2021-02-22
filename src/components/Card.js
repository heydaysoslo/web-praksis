import React from 'react'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'
import Heading from './primitives/Heading'
import Text from './primitives/Text'

const Card = ({ post }) => {
  const { link, title, excerpt } = post
  return (
    <div>
      <Link to={link}>
        <Heading as="h2" size="h3">
          {renderHTML(title?.rendered)}
        </Heading>
        {excerpt?.rendered && (
          <Text size="excerpt">{renderHTML(excerpt.rendered)}</Text>
        )}
      </Link>
    </div>
  )
}

export default Card
