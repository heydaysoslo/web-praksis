import React, { Component, Fragment } from 'react'
import renderHTML from 'react-render-html'
import ShareButtons from '../components/ShareButtons'
import { postDateFormat } from '../utils/date'
import AcfImage from '../components/AcfImage'
import { baseUrl, getObjectLink } from '../utils/wp'
import PostTerms from '../components/PostTerms'
import PostTags from '../components/PostTags'
import Author from '../components/Author'

class Article extends Component {
  makeEmbedsResponsive = () => {
    const embeds = document.getElementsByClassName('embed')
    if (embeds) {
      Object.keys(embeds).forEach(key => {
        const el = embeds[key]
        let iframe = el.getElementsByTagName('iframe')
        if (iframe) {
          iframe = iframe[0]
          const w = parseFloat(iframe.getAttribute('width'))
          const h = parseFloat(iframe.getAttribute('height'))
          if (h && w) {
            const pusher = document.createElement('div')
            pusher.className = 'embed__pusher'
            pusher.style.paddingTop = (h / w) * 100 + '%'
            el.appendChild(pusher)
          }
        }
      })
    }
  }

  componentDidMount = () => {
    this.makeEmbedsResponsive()
  }

  render() {
    const { post } = this.props
    return (
      <article className="Article">
        <header className="ArticleHeader">
          {post.type === 'post' && (
            <div className="ArticleHeader__meta">
              <time dateTime={post.date} className="date">
                {postDateFormat(post.date)}
              </time>
              {' • '}
              <span className="ArticleHeader__read-time">
                {post.read_time} {post.read_time > 1 ? 'minutter' : 'minutt'}{' '}
                lesetid
              </span>
            </div>
          )}
          {post.title && (
            <h1 className="ArticleHeader__title">
              {renderHTML(post.title.rendered)}
            </h1>
          )}
          {post.acf.intro && (
            <div className="ArticleHeader__intro">
              {renderHTML(post.acf.intro)}
            </div>
          )}
          {post.featured_image && (
            <div className="ArticleHeader__image">
              <AcfImage image={post.featured_image} />
            </div>
          )}
        </header>
        {post.better_featured_image && (
          <img
            src={post.better_featured_image.source_url}
            alt={post.better_featured_image.alt_text}
          />
        )}
        <div className="Article__content editor">
          {post.content && renderHTML(post.content.rendered)}
        </div>
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
        {post.type === 'post' && (
          <Fragment>
            <Author author={post.author} />
            <PostTerms post={post} />
            <PostTags post={post} />
            <ShareButtons url={baseUrl(getObjectLink(post))} />
          </Fragment>
        )}
      </article>
    )
  }
}

export default Article
