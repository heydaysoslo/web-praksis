import React, { Component } from 'react'
import { getPosts } from '../utils/wp'

import Post from '../components/Post'

class PostsPage extends Component {
  state = {
    posts: [],
    page: 1
  }
  componentDidMount = () => {
    getPosts(this.state.page).then(res => {
      this.setState({
        posts: res
      })
    })
  }
  loadNextPage = () => {}
  render() {
    const { posts } = this.state
    return (
      <div className="main">
        <div className="container">
          <div className="cards">
            {posts && posts.map(p => <Post key={p.id} p={p} />)}
          </div>
          <button onClick={this.loadNextPage()}>Load next page</button>
        </div>
      </div>
    )
  }
}

export default PostsPage
