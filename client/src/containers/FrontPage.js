import React, { Component } from 'react'
import { getPosts } from '../utils/wp'

import Post from '../components/Post'

class FrontPage extends Component {
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
  loadNextPage = () => {
    const nextPage = this.state.page + 1
    getPosts(nextPage).then(res => {
      this.setState(prevState => {
        return {
          posts: [...prevState.posts, ...res],
          page: nextPage
        }
      })
    })
  }
  render() {
    const { posts } = this.state
    return (
      <div className="main">
        <div className="container">
          <div className="cards">
            {posts && posts.map(p => <Post key={p.id} post={p} />)}
          </div>
          <button onClick={this.loadNextPage}>Load next page</button>
        </div>
      </div>
    )
  }
}

export default FrontPage
