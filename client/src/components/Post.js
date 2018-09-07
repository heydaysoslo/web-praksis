import React from 'react'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'

const Post = props => {
  const { post } = props
  return (
    <div className="Cards__item">
      <header>
        <h1>{post.title.rendered}</h1>
        <p>
          Lesetid: {post.read_time} {post.read_time > 1 ? 'minutter' : 'minutt'}
        </p>
      </header>
      <div className="Cards__content">{renderHTML(post.content.rendered)}</div>
      <Link to={`/posts/${post.slug}`}>Les mer</Link>
    </div>
  )
}

export default Post
