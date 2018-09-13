import React, { Component } from 'react'
import renderHTML from 'react-render-html'
import Share from '../components/ShareButtons'
import { postDateFormat } from '../utils/date'
import AcfImage from '../components/AcfImage'

class Article extends Component {
  render() {
    const { post } = this.props
    return (
      <article className="Article">
        <div className="container">
          <header className="ArticleHeader">
            <div className="ArticleHeader__meta">
              <span className="date">{postDateFormat(post.date)}</span>
              <span className="type">Leserinnlegg</span>
            </div>
            {post.title && (
              <h1 className="ArticleHeader__title">{post.title.rendered}</h1>
            )}
            {post.acf.intro && (
              <div className="ArticleHeader__intro">{post.acf.intro}</div>
            )}
            {post.featured_image && <AcfImage image={post.featured_image} />}
          </header>
          {post.better_featured_image && (
            <img
              src={post.better_featured_image.source_url}
              alt={post.better_featured_image.alt_text}
            />
          )}
          <div className="article__content editor">
            {post.content && renderHTML(post.content.rendered)}
          </div>
          <pre>{JSON.stringify(post, null, 2)}</pre>
          <Share />
        </div>
      </article>
    )
  }
}

export default Article
