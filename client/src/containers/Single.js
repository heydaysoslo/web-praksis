import React, { Component, Fragment } from 'react'
import HeaderMeta from '../components/HeaderMeta'
import Article from '../containers/Article'
import { getObjectBySlug } from '../utils/wp'
import PostPassword from '../components/PostPassword'
import Loading from '../components/Loading'

class Single extends Component {
  state = {
    loading: true,
    noMatch: false,
    post: null,
    unlocked: false
  }

  loadContent = () => {
    // Reset state
    this.setState({
      loading: true,
      unlocked: false
    })

    const urlParams = this.props.match.params
    getObjectBySlug(urlParams)
      .then(post => {
        this.setState({
          post,
          loading: false
        })
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate = prevProps => {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      this.loadContent()
    }
  }

  componentDidMount = () => {
    this.loadContent()
  }

  onPostUnlocked = post => {
    this.setState({
      post,
      unlocked: true
    })
  }

  render() {
    const { loading, noMatch, post, unlocked } = this.state
    if (loading) {
      return <Loading />
    }
    if (noMatch || !post) {
      return <div>404</div>
    }
    if (post.content.protected && !unlocked) {
      return (
        <PostPassword
          postType={post.type}
          postId={post.id}
          postUnlocked={this.onPostUnlocked}
        />
      )
    }
    return (
      <Fragment>
        <HeaderMeta data={post} />
        <Article post={post} />
      </Fragment>
    )
  }
}

export default Single
