import React from 'react'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'

const Post = props => {
  const { post } = props
  return (
    <article className="Cards__item">
      <Link to={`/post/${post.slug}`}>
        <h1>{renderHTML(post.title.rendered)}</h1>
        <div className="Cards__content">
          {renderHTML(post.excerpt.rendered)}
        </div>
      </Link>
    </article>
  )
}

export default Post
