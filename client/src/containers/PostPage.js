import React, { Component } from 'react'
import { getPostBySlug } from '../utils/wp'
import { injectInlineScripts } from '../utils/scriptInject'
import Article from './Article'

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
    return <Article post={this.state.post} />
  }
}

export default PostPage
