import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Article from './ArticleNew'
import NoMatchPage from './NoMatchPage'
import { getObjectBySlug } from '../utils/wp'
import PostPassword from '../components/PostPassword'
import Loading from '../components/Loading'

const Single = () => {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [noMatch, setNoMatch] = useState(false)
  const [post, setPost] = useState(null)
  const [unlocked, setUnlocked] = useState(false)

  const loadContent = () => {
    setLoading(true)
    setUnlocked(false)

    getObjectBySlug(params)
      .then((post) => {
        setPost(post)
        setLoading(false)
      })
      .catch((err) => {
        setNoMatch(true)
      })
  }

  const onPostUnlocked = (post) => {
    setPost(post)
    setUnlocked(true)
  }

  useEffect(loadContent, [params.slug, params.type])

  if (loading) {
    return <Loading />
  }

  if (noMatch || !post) {
    return <NoMatchPage />
  }

  if (post?.content?.protected && !unlocked) {
    return (
      <PostPassword
        postType={post.type}
        postId={post.id}
        postUnlocked={onPostUnlocked}
      />
    )
  }

  return <Article single post={post} preview={false} />
}

export default Single
