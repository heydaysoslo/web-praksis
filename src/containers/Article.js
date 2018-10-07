import React, { Component, Fragment } from 'react'
import renderHTML from 'react-render-html'
import { StickyContainer, Sticky } from 'react-sticky'
import ShareButtons from '../components/ShareButtons'
import { postDateFormat } from '../utils/date'
import AcfImage from '../components/AcfImage'
import { baseUrl, getObjectLink, getPostTerms } from '../utils/wp'
// import PostTerms from '../components/PostTerms'
// import PostTags from '../components/PostTags'
import Author from '../components/Author'
import EditPostLink from '../components/EditPostLink'
import { Link } from 'react-router-dom'
import cc from 'classcat'
import autolinker from 'autolinker'
import { elementContainsMulti } from '../utils/functions'

class Article extends Component {
  state = {
    articleType: null
  }

  makeEmbedsResponsive = () => {
    const embeds = document.getElementsByClassName('embed')
    if (embeds) {
      const existingPusher = document.getElementsByClassName('embed__pusher')
      Object.keys(embeds).forEach(key => {
        const el = embeds[key]
        if (!elementContainsMulti(el, existingPusher)) {
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
    if (this.props.single) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { post, preview } = this.props
    let articleStyle = post.article_style || 'default'
    const { articleType } = this.state
    let theContent = post.content.rendered
    theContent = autolinker.link(theContent, {
      className: 'editorLink',
      replaceFn: match => {
        switch (match.getType()) {
          case 'email':
            const email = match.getEmail()
            return `<a className="editorLink editorLink-email" href="mailto:${email}">${email}</a>`
          default:
            return
        }
      }
    })
    theContent = renderHTML(theContent)
    return (
      <article
        className={cc({
          container: true,
          Article: true,
          [`Article--${articleStyle}`]: true,
          'Article--single': this.props.single
        })}
      >
        <div className="Article__inner">
          <header className="Article__header wrapper wrapper--text">
            {preview && <p className="Article__preview">Forhåndsvisning</p>}
            <div className="Article__meta">
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
          {/* <StickyContainer className="Article__stickyContainer"> */}
          <div className="Article__content editor wrapper wrapper--text">
            {theContent}
          </div>
          <footer className="ArticleFooter Article__footer wrapper wrapper--text">
            <div className="ArticleFooter__share">
              <ShareButtons url={baseUrl(getObjectLink(post))} />
            </div>
            <div className="ArticleFooter__content">
              {post.type === 'post' && (
                <Author className="ArticleFooter__item" author={post.author} />
              )}
              {/* <PostTerms className="ArticleFooter__item" post={post} />
              <PostTags className="ArticleFooter__item" post={post} /> */}
              {/* {!preview && (
                  <ShareButtons
                    className="ArticleFooter__item"
                    url={baseUrl(getObjectLink(post))}
                  />
                )} */}
              <EditPostLink post={post} />
            </div>
          </footer>
          {/* <Sticky disableCompensation topOffset={-40}>
              {({ style, isSticky, distanceFromBottom }) => (
                <div
                  style={style}
                  className={cc({
                    Article__sticky: true,
                    'Article__sticky--stuck': isSticky,
                    'Article__sticky--bottom': distanceFromBottom <= 1
                  })}
                >
                  {!(preview || post.type !== 'post') && (
                    <ShareButtons url={baseUrl(getObjectLink(post))} />
                  )}
                  <EditPostLink post={post} />
                </div>
              )}
            </Sticky>
          </StickyContainer> */}
        </div>
      </article>
    )
  }
}

export default Article
