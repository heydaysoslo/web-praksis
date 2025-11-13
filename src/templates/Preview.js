import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Loading from '../components/Loading'
import { getPreview, getSettings } from '../utils/wp'
import Article from './ArticleNew'
import FrontPageNew from './FrontPageNew'

const Preview = () => {
  const params = useParams()
  const [post, setPost] = useState(false)
  const [frontPageId, setFrontPageId] = useState(null)

  useEffect(() => {
    getSettings().then((settings) => {
      setFrontPageId(settings.front_page_id)
      return getPreview({ ...params })
        .then((res) => {
          setPost(res)
        })
        .catch((err) => console.log('ERROR', err))
    })
  }, [params.id])

  if (!post) {
    return <Loading title="Laster forhåndsvisning" />
  }
  return (
    <Fragment>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      {parseInt(frontPageId) === parseInt(post.parent) ? (
        <FrontPageNew preview page={post} />
      ) : (
        <Article single preview post={post} />
      )}
    </Fragment>
  )
}

export default Preview
