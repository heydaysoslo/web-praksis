import React, { Component } from 'react'
import Loading from '../components/Loading'
import Post from '../components/Post'
import { getTagBySlug, getPostsByTag } from '../utils/wp'
import TagCloud from '../components/TagCloud'
import PostGrid from '../components/PostGrid'

class Tag extends Component {
  state = {
    tag: null,
    loading: true,
    posts: [],
  }

  fetchData = (slug) => {
    getTagBySlug(slug).then((tag) => {
      this.setState({ tag })
      getPostsByTag(tag.id).then((posts) => {
        this.setState({ posts, loading: false })
      })
    })
  }

  componentDidMount = () => {
    this.fetchData(this.props.match.params.tag)
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.tag !== prevProps.match.params.tag) {
      this.fetchData(this.props.match.params.tag)
    }
  }

  render() {
    const { loading, posts, tag } = this.state
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
}

export default Tag
