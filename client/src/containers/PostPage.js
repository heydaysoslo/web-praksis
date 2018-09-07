import React, { Component } from 'react'
import renderHTML from 'react-render-html'
import { getPostBySlug } from '../utils/wp'
import { injectInlineScripts } from '../utils/scriptInject'

class PostPage extends Component {
  state = {
    post: []
  }
  getPost = slug => {
    getPostBySlug(slug).then(res => {
      const post = res[0]
      if (post.content && post.content.rendered) {
        const injectedScripts = injectInlineScripts(post.content.rendered)
        console.log(injectedScripts)
      }
      this.setState({ post })
    })
  }
  componentDidMount = () => {
    this.getPost(this.props.match.params.slug)
  }
  componentWillReceiveProps = async nextProps => {
    // Replace with componentDidUpdate https://reactjs.org/docs/react-component.html#componentdidupdate
    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getPost(nextProps.match.params.slug)
    }
  }
  render() {
    const { post } = this.state
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

export default PostPage
