import React, { Component, Fragment } from 'react'
import renderHTML from 'react-render-html'
import ShareButtons from '../components/ShareButtons'
import { postDateFormat } from '../utils/date'
import AcfImage from '../components/AcfImage'
import { baseUrl, getObjectLink, getPostTerms } from '../utils/wp'
import PostTerms from '../components/PostTerms'
import PostTags from '../components/PostTags'
import Author from '../components/Author'
import EditPostLink from '../components/EditPostLink'
import { Link } from 'react-router-dom'
import cc from 'classcat'

class Article extends Component {
  state = {
    articleType: null
  }

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

  setArticleType = () => {
    const articleTypes = getPostTerms(this.props.post, 'content_type')
    if (articleTypes) {
      this.setState({
        articleType: articleTypes[0]
      })
    }
  }

  componentDidMount = () => {
    this.makeEmbedsResponsive()
    this.setArticleType()
  }

  render() {
    const { post, preview } = this.props
    let articleStyle = post.article_style || 'default'
    const { articleType } = this.state
    return (
      <article
        className={cc({
          container: true,
          Article: true,
          [`Article--${articleStyle}`]: true
        })}
      >
        <div className="Article__inner">
          <header className="Article__header container container--text">
            <div className="Article__meta">
              {preview && <p>Forhåndsvisning</p>}
              {post.type === 'post' && (
                <Fragment>
                  <time dateTime={post.date} className="date">
                    {postDateFormat(post.date)}
                  </time>
                  {articleType && (
                    <Fragment>
                      {' • '}
                      <Link to={articleType.link} className="Article__type">
                        {articleType.name}
                      </Link>
                    </Fragment>
                  )}
                  {' • '}
                  <span className="Article__read-time">
                    {post.read_time}{' '}
                    {post.read_time > 1 ? 'minutter' : 'minutt'} lesetid
                  </span>
                </Fragment>
              )}
            </div>
            {post.title && (
              <h1 className="Article__title">
                <Link to={getObjectLink(post)}>
                  {renderHTML(post.title.rendered)}
                </Link>
              </h1>
            )}
            {post.acf.intro && (
              <div className="Article__intro">{renderHTML(post.acf.intro)}</div>
            )}
          </header>
          {post.featured_image && (
            <div className="Article__image">
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
                <Author className="ArticleFooter__item" author={post.author} />
                <PostTerms className="ArticleFooter__item" post={post} />
                <PostTags className="ArticleFooter__item" post={post} />
                {!preview && (
                  <ShareButtons
                    className="ArticleFooter__item"
                    url={baseUrl(getObjectLink(post))}
                  />
                )}
              </Fragment>
            )}
            <EditPostLink className="ArticleFooter__item" post={post} />
          </footer>
        </div>
      </article>
    )
  }
}

export default Article
