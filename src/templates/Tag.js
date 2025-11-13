import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Post from '../components/Post'
import { getTagBySlug, getPostsByTag } from '../utils/wp'
import TagCloud from '../components/TagCloud'
import PostGrid from '../components/PostGrid'

const Tag = () => {
  const params = useParams()
  const [tag, setTag] = useState(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])

  const fetchData = (slug) => {
    getTagBySlug(slug).then((tag) => {
      setTag(tag)
      getPostsByTag(tag.id).then((posts) => {
        setPosts(posts)
        setLoading(false)
      })
    })
  }

  useEffect(() => {
    fetchData(params.tag)
  }, [params.tag])

  if (loading) {
    return <Loading />
  }
  if (!posts.length) {
    return (
      <div>
        Fant ingen innlegg for stikkordet <strong>{tag.name}</strong>
      </div>
    )
  }
  return (
    <article className="TagPage container">
      <header className="TagPage__header">
        <TagCloud className="TagPage__tags" />
        <div className="TagPage__result">
          Innlegg tagget med <strong>{tag.name}</strong>
        </div>
      </header>
      {posts && <PostGrid posts={posts} />}
    </article>
  )
}

export default Tag
