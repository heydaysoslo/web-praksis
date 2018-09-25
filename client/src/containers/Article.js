import React, { Component, Fragment } from 'react'
import renderHTML from 'react-render-html'
import ShareButtons from '../components/ShareButtons'
import { postDateFormat } from '../utils/date'
import AcfImage from '../components/AcfImage'
import { baseUrl, getObjectLink } from '../utils/wp'
import PostTerms from '../components/PostTerms'
import PostTags from '../components/PostTags'
import Author from '../components/Author'
import EditPostLink from '../components/EditPostLink'

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
    const { post, preview } = this.props
    return (
      <article className="Article">
        <div className="container">
          <hr />
        </div>
        <header className="ArticleHeader container container--text">
          <div className="ArticleHeader__meta">
            {preview && <p>Forhåndsvisning</p>}
            {post.type === 'post' && (
              <Fragment>
                <time dateTime={post.date} className="date">
                  {postDateFormat(post.date)}
                </time>
                {' • '}
                <span className="ArticleHeader__read-time">
                  {post.read_time} {post.read_time > 1 ? 'minutter' : 'minutt'}{' '}
                  lesetid
                </span>
              </Fragment>
            )}
          </div>
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
        </header>
        {post.featured_image && (
          <div className="Article__image container">
            <AcfImage image={post.featured_image} />
          </div>
        )}
        {post.better_featured_image && (
          <img
            src={post.better_featured_image.source_url}
            alt={post.better_featured_image.alt_text}
          />
        )}
        <div className="Article__content editor container container--text">
          {post.content && renderHTML(post.content.rendered)}
        </div>
        <footer className="ArticleFooter Article__footer container container--text">
          {post.type === 'post' && (
            <Fragment>
              <div className="ArticleFooter__item">
                <Author author={post.author} />
              </div>
              <div className="ArticleFooter__item">
                <PostTerms post={post} />
              </div>
              <div className="ArticleFooter__item">
                <PostTags post={post} />
              </div>
              {!preview && (
                <div className="ArticleFooter__item">
                  <ShareButtons url={baseUrl(getObjectLink(post))} />
                </div>
              )}
            </Fragment>
          )}
          <div className="ArticleFooter__item">
            <EditPostLink post={post} />
          </div>
        </footer>
      </article>
    )
  }
}

export default Article
