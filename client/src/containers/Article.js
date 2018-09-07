import React, { Component } from 'react'
import renderHTML from 'react-render-html'

class Article extends Component {
  render() {
    const { post } = this.props
    return (
      <article className="article">
        <div className="container">
          {post.title && <h1>{post.title.rendered}</h1>}
          {post.better_featured_image && (
            <img
              src={post.better_featured_image.source_url}
              alt={post.better_featured_image.alt_text}
            />
          )}
          <div className="article__content editor">
            {post.content && renderHTML(post.content.rendered)}
          </div>
        </div>
      </article>
    )
  }
}

export default Article
