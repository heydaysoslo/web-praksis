import React, { Component, Fragment } from 'react'
import HeaderMeta from '../components/HeaderMeta'
import { getObjectBySlug } from '../utils/wp'
import PostPassword from '../components/PostPassword'

class Single extends Component {
  state = {
    loading: true,
    noMatch: false,
    post: null,
    unlocked: false
  }

  loadContent = () => {
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

  componentDidMount = () => {
    this.loadContent()
  }

  unlockPost = post => {
    this.setState({
      post,
      unlocked: true
    })
  }

  render() {
    const { loading, noMatch, post, unlocked } = this.state
    if (loading) {
      return <div>Laster</div>
    }
    if (noMatch) {
      return <div>404</div>
    }
    if (post.content.protected && !unlocked) {
      return (
        <PostPassword
          postType={post.type}
          postId={post.id}
          unlockPost={this.unlockPost}
        />
      )
    }
    return (
      <Fragment>
        <HeaderMeta data={post} />
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </Fragment>
    )
  }
}

export default Single
