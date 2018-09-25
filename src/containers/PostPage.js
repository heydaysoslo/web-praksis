import React, { Component } from 'react'
import { getPostBySlug, getProtectedPost } from '../utils/wp'
import { injectInlineScripts } from '../utils/scriptInject'
import Article from './Article'

class PostPage extends Component {
  state = {
    post: [],
    isUnlocked: false,
    password: '',
    pwmessage: ''
  }

  getPost = slug => {
    getPostBySlug(slug).then(res => {
      const post = res[0]
      if (post.content && post.content.rendered) {
        injectInlineScripts(post.content.rendered)
      }
      console.log(post)
      this.setState({ post })
    })
  }

  handleSubmit = event => {
    getProtectedPost(this.state.post.id, this.state.password)
      .then(post => {
        if (post.content && post.content.rendered) {
          injectInlineScripts(post.content.rendered)
        }
        this.setState({ post, isUnlocked: true })
      })
      .catch(err => {
        console.log('error', err)
        if (err.message) {
          this.setState({
            pwmessage: err.message
          })
        }
      })
    event.preventDefault()
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

  handleChange = event => {
    this.setState({ password: event.target.value })
  }

  render() {
    if (
      this.state.post &&
      this.state.post.protected &&
      !this.state.isUnlocked
    ) {
      return (
        <article className="article">
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <label>
                Passordbeskyttet innlegg
                <br />
                <input onChange={this.handleChange} type="text" />
                {this.state.pwmessage && <p>{this.state.pwmessage}</p>}
              </label>
            </form>
          </div>
        </article>
      )
    }
    return <Article post={this.state.post} />
  }
}

export default PostPage
