import React, { Component } from 'react'
import renderHTML from 'react-render-html'
import { getPageBySlug } from '../utils/wp'
import NoMatchPage from '../containers/NoMatchPage'

class Page extends Component {
  state = {
    post: null,
    loading: false
  }
  getPost = slug => {
    this.setState({
      loading: true
    })
    getPageBySlug(slug).then(res => {
      if (res.length) {
        this.setState({
          loading: false,
          post: res[0]
        })
      } else {
        this.setState({
          loading: false,
          post: null
        })
      }
    })
  }
  componentDidMount = () => {
    this.getPost(this.props.match.params.slug)
  }
  componentWillReceiveProps = async nextProps => {
    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getPost(nextProps.match.params.slug)
    }
  }
  render() {
    const { post } = this.state
    if (this.state.loading) {
      return <div>Loading…</div>
    } else if (!this.state.post) {
      return <NoMatchPage />
    } else {
      return (
        <article className="article">
          <div className="container">
            {post.title && <h1>{post.title.rendered}</h1>}
            {post.better_featured_image && (
              <img
                src={post.better_featured_image.source_url}
                alt={post.better_featured_image.alt_text}
              />
            )}
            <div className="article__content editor">
              {post.content && renderHTML(post.content.rendered)}
            </div>
          </div>
        </article>
      )
    }
  }
}

export default Page
