import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import { getObjectLink } from '../utils/wp'
import Box from './primitives/Box'
import Heading from './primitives/Heading'

const Post = (props) => {
  const { post } = props
  if (!post) {
    return null
  }
  return (
    <article className="Card">
      <Link className="container container--text" to={getObjectLink(post)}>
        <Heading as="h2" size="h1">
          {ReactHtmlParser(post.title.rendered)}
        </Heading>
        <Box mt={4} className="Card__content editor">
          {ReactHtmlParser(post.excerpt.rendered)}
        </Box>
      </Link>
    </article>
  )
}

export default Post
