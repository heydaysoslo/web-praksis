import React from 'react'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'
import { getObjectLink } from '../utils/wp'

const Post = (props) => {
  const { post } = props
  if (!post) {
    return null
  }
  return (
    <article className="Card">
      <Link className="container container--text" to={getObjectLink(post)}>
        <h1 className="Card__title">{renderHTML(post.title.rendered)}</h1>
        <div className="Card__content editor">
          {renderHTML(post.excerpt.rendered)}
        </div>
      </Link>
    </article>
  )
}

export default Post
