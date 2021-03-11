import React, { useEffect, useState } from 'react'
import cc from 'classcat'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'

import Layout from '../components/Layout'
import { baseUrl, getObjectLink, getPostTerms } from '../utils/wp'
import { postDateFormat } from '../utils/date'
import ShareButtons from '../components/ShareButtons'
import AcfImage from '../components/AcfImage'
import Author from '../components/Author'
import EditPostLink from '../components/EditPostLink'
import RelatedPosts from '../components/RelatedPosts'
import WpTheContent from '../components/WpTheContent'

const Article = ({ post, single, preview }) => {
  const [articleType, setArticleType] = useState(null)
  const articleStyle = post?.article_style || 'default'
  const author = post?.acf?.contributor[0] || post.author

  const getArticleType = () => {
    const articleTypes = getPostTerms(post, 'content_type')
    if (articleTypes && articleTypes[0]) {
      setArticleType(articleTypes[0])
    }
  }

  const onMount = () => {
    getArticleType()
    if (single) {
      window.scrollTo(0, 0)
    }
  }

  useEffect(onMount, [])

  return (
    <Layout>
      <article
        className={cc({
          container: true,
          Article: true,
          [`Article--${articleStyle}`]: true,
          'Article--single': Boolean(single),
        })}
      >
        <div className="Article__inner">
          <header className="Article__header wrapper wrapper--text">
            {preview && <p className="Article__preview">Forhåndsvisning</p>}
            <div className="Article__meta">
              {post.type === 'post' && (
                <>
                  <time dateTime={post.date} className="date">
                    {postDateFormat(post.date)}
                  </time>
                  {articleType && (
                    <>
                      {' • '}
                      <Link to={articleType.link} className="Article__type">
                        {articleType.name}
                      </Link>
                    </>
                  )}
                  {' • '}
                  <span className="Article__read-time">
                    {post.read_time}{' '}
                    {post.read_time > 1 ? 'minutter' : 'minutt'} lesetid
                  </span>
                </>
              )}
            </div>
            {post.title && (
              <h1 className="Article__title">
                <Link to={getObjectLink(post)}>
                  {ReactHtmlParser(post.title.rendered)}
                </Link>
              </h1>
            )}
            {post.acf.intro && (
              <div className="Article__intro">
                {ReactHtmlParser(post.acf.intro)}
              </div>
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
          <div className="Article__content editor wrapper wrapper--text">
            <WpTheContent content={post?.content?.rendered} />
          </div>
          <footer className="ArticleFooter Article__footer wrapper wrapper--text">
            <div className="ArticleFooter__share">
              <ShareButtons url={baseUrl(getObjectLink(post))} />
            </div>
            <div className="ArticleFooter__content">
              {post.type === 'post' && (
                <Author className="ArticleFooter__item" author={author} />
              )}
              <EditPostLink post={post} />
            </div>
          </footer>
        </div>
      </article>
      {single && post?.type === 'post' && <RelatedPosts post={post} />}
    </Layout>
  )
}

export default Article
